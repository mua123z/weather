// Search.jsx
import { useState } from "react";
import style from "./SeaHis.module.css";
import { useNavigate } from "react-router-dom";
import { fetchCitySuggestions } from "../../Api/Api";

function Search({ onSearch }) {
    
    //State lưu danh sách gợi ý
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const [city, setCity] = useState("");
    const navigate = useNavigate(); // ✅ THÊM DÒNG NÀY để tạo biến navigate

    const handleChange = async (e) => {
        const value = e.target.value;
        setCity(value);

        if (value.trim() === "") {
            setSuggestions([]);
            return;
        }

        try {
            setIsLoading(true);
            const results = await fetchCitySuggestions(value, 5);
            // Lấy tên, quốc gia để hiển thị
            const mapped = results.map((item) => ({
                name: `${item.name}, ${item.country}`,
                originalName: item.name, // dùng cho search
            }));
            setSuggestions(mapped);
        } catch (error) {
            console.error("Lỗi lấy gợi ý thành phố:", error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    //sự kiện khi người dùng click vào thành phần gợi ý
    const handleSuggestionClick = (suggestion) => {
        setCity(suggestion.originalName); // set input lại đúng tên
        setSuggestions([]); // ẩn gợi ý
        navigate(`/weatherCard?city=${encodeURIComponent(suggestion.originalName.trim())}`);
    };



    const handleSearch = () => {
        if (city.trim() !== "") {
            navigate(`/weatherCard?city=${encodeURIComponent(city.trim())}`);  // gọi callback gửi cityName lên cha
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={style.Search}>
            <input
                className={`${style.timkiem} fs-5`}
                type="text"
                placeholder="Nhập tên thành phố để xem. Ví dụ 'Hồ Chí Minh'"
                value={city}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <i
                className={`${style.i} bx bx-search fs-3 position-absolute`}
                onClick={handleSearch}
                style={{ cursor: "pointer" }}
            ></i>

            {/* hiển thị danh sách gợi ý */}
            {suggestions.length > 0 && (
                <ul className={style.suggestionList}>
                    {suggestions.map((sugg, index) => (
                        <li
                            key={index}
                            className={style.suggestionItem}
                            onClick={() => handleSuggestionClick(sugg)}
                        >
                            {sugg.name}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}

export default Search;
