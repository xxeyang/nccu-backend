// 1. 引入我們需要的套件
const express = require('express');
const cors = require('cors');

// 2. 引入我們的資料檔案
const landData = require('./data.json');

// ===[修改點 1：讀取我們設定的秘密金鑰]===
// process.env.API_SECRET_KEY 會讀取您在 Render 上設定的環境變數
const OUR_SECRET_KEY = process.env.API_SECRET_KEY;

// 3. 建立一個 Express 應用程式
const app = express();

// 4. 定義伺服器要運行的通訊埠 (Port)
const PORT = process.env.PORT || 3000; // Render 會自動設定 PORT

// 5. 啟用 CORS
app.use(cors());

// 6. 建立我們的 API 端點
app.get('/api/data', (req, res) => {
    
    // ===[修改點 2：檢查通關密語]===
    // 從請求的標頭 (headers) 中，找出對方帶來的鑰匙
    const providedKey = req.headers['x-api-key'];

    // 檢查鑰匙是否正確
    if (!providedKey || providedKey !== OUR_SECRET_KEY) {
        // 如果沒有鑰匙，或鑰匙不正確，就回傳 401 Unauthorized 錯誤
        return res.status(401).json({ error: 'Unauthorized: Access Key is missing or invalid.' });
    }

    // 如果鑰匙正確，才回傳資料
    res.json(landData);
});

// 7. 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器已啟動，並已加上 API Key 保護！`);
});