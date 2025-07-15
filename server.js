// 1. 引入我們需要的套件
const express = require('express');
const cors = require('cors');

// 2. 引入我們的資料檔案
//    Node.js 會自動讀取並解析 data.json 檔案
const landData = require('./data.json');

// 3. 建立一個 Express 應用程式
const app = express();

// 4. 定義伺服器要運行的通訊埠 (Port)，我們先用 3000
const PORT = 3000;

// 5. 啟用 CORS 中介軟體，這一步很重要，它允許您的前端網頁來請求資料
app.use(cors());

// 6. 建立我們的 API 端點 (API Endpoint)
//    未來只要訪問 "http://.../api/data" 這個網址，伺服器就會回傳您的資料
app.get('/api/data', (req, res) => {
    // 使用 res.json() 將我們讀進來的 landData 物件，以 JSON 格式回傳給前端
    res.json(landData);
});

// 7. 啟動伺服器，並讓它在指定的 Port 上監聽請求
app.listen(PORT, () => {
    console.log(`恭喜！您的資料 API 伺服器正在 http://localhost:${PORT} 上成功運行`);
    console.log(`現在請打開您的網頁瀏覽器，在網址列輸入 http://localhost:${PORT}/api/data`);
});