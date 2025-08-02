// src/Api/Api.js
export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Tìm danh sách địa điểm gợi ý theo tên thành phố
export const fetchCitySuggestions = async (query, limit = 5) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Không thể lấy danh sách gợi ý thành phố.");
    return await res.json(); // Trả về mảng các địa điểm
};

//Khi cần lấy thời tiết theo vị trí người dùng
export const fetchWeatherByCoords = async (lat, lon) => {
    const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&lang=vi&appid=${API_KEY}`);
    if (!res.ok) throw new Error("Không thể lấy thời tiết từ tọa độ.");
    return await res.json();
};
//Khi cần lấy thời tiết theo vị trí tìm kiếm
export const fetchWeatherByCity = async (cityName) => {
    const res = await fetch(`${BASE_URL}/weather?q=${cityName}&units=metric&lang=vi&appid=${API_KEY}`);
    if (!res.ok) throw new Error("Không tìm thấy thành phố.");
    return await res.json();
};


// nhiệt độ coa nhất thấp nhất trong ngày
export const fetchForecastByCity = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&lang=vi&appid=${API_KEY}`;
  const res = await fetch(url);
  console.log("FETCH:", res.status, url);
  if (!res.ok) throw new Error("Không tìm thấy dự báo thành phố.");
  return await res.json();
};

//dự báo 7 ngày tiếp theo
export async function fetchWeather7Day(lat, lon) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Không lấy được dữ liệu 7 ngày");
    }
    const data = await response.json();
    return data.daily; // Trả về mảng 7 ngày
}

//mô tả  dự báo dùng chung
export function generateForecastDescription(filtered) {
    const translate = (desc) => {
        const lower = desc.toLowerCase();
        if (lower.includes("thunderstorm")) return "giông bão";
        if (lower.includes("drizzle")) return "mưa phùn";
        if (lower.includes("rain")) return "mưa nhẹ";
        if (lower.includes("clouds")) {
            if (lower.includes("few")) return "ít mây";
            if (lower.includes("scattered")) return "mây rải rác";
            if (lower.includes("broken")) return "mây cụm";
            return "nhiều mây";
        }
        if (lower.includes("clear")) return "trời quang";
        if (lower.includes("snow")) return "tuyết";
        if (lower.includes("fog") || lower.includes("mist")) return "sương mù";
        return desc;
    };

    const summarize = (data) => {
        const descs = data.map(i => translate(i.weather[0].description));
        const counts = {};
        descs.forEach(d => counts[d] = (counts[d] || 0) + 1);
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        return sorted.map(([desc]) => desc).slice(0, 2).join(" và ");
    };

    const groupByTime = (start, end) => filtered.filter(item => {
        const hour = new Date(item.dt_txt).getHours();
        return hour >= start && hour < end;
    });

    const morning = summarize(groupByTime(5, 12));
    const afternoon = summarize(groupByTime(12, 18));
    const night = summarize(groupByTime(18, 24));

    // Gộp mô tả giống nhau
    if (morning === afternoon && afternoon === night && morning) {
        return `Cả ngày trời ${morning}`;
    }

    if (morning === afternoon && morning) {
        return `Buổi sáng và chiều trời ${morning}; buổi tối ${night}`;
    }

    if (afternoon === night && afternoon) {
        return `Buổi sáng ${morning}; buổi chiều và tối ${afternoon}`;
    }

    if (morning === night && morning) {
        return `Buổi sáng và tối ${morning}; buổi chiều ${afternoon}`;
    }

    // Mô tả riêng từng khung giờ nếu khác nhau
    return `Buổi sáng ${morning}; buổi chiều ${afternoon}; buổi tối ${night}`;
}



