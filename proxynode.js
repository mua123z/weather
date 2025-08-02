// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";

// const app = express();
// app.use(cors()); // cho phép mọi origin truy cập proxy

// const apiKey = "33a7fe3b77ce084b10ead44b90116d89";

// // Endpoint proxy
// app.get("/weather", async (req, res) => {
//   const city = req.query.city;
//   if (!city) {
//     return res.status(400).json({ error: "Thiếu tham số city" });
//   }

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Lỗi khi lấy dữ liệu thời tiết" });
//   }
// });

// // Chạy server
// app.listen(3001, () => {
//   console.log("Proxy server đang chạy tại http://localhost:3001");
// });
