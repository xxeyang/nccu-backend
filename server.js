// 1. 引入我們需要的套件
const express = require('express');
const cors = require('cors');
const landData = require('./data.json');
const landDataTry = require('./datatry.json'); // 【新增】讀取測試用的資料檔

// 2. 讀取秘密金鑰，並設定一個版本號，方便我們辨識
const OUR_SECRET_KEY = process.env.API_SECRET_KEY || 'nccu-data-is-super-secret-12345'; // 加上一個備用金鑰
const APP_VERSION = "1.3"; // 更新版本號

// 3. 建立 Express 應用程式
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// 4. 原本的 API (給正式網站用)
app.get('/api/data', (req, res) => {
    const providedKey = req.headers['x-api-key'];

    // 改良後的檢查點：
    // 只要「伺服器端沒有設定金鑰」或「使用者端帶來的金鑰不匹配」，就阻擋
    if (!OUR_SECRET_KEY || providedKey !== OUR_SECRET_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // 檢查通過，才回傳資料
    res.json(landData);
});

// ===[ 5. 【新增】給 CodePen 測試用的 API ]===
app.get('/api/datatry', (req, res) => {
    const providedKey = req.headers['x-api-key'];

    // 同樣進行金鑰檢查
    if (!OUR_SECRET_KEY || providedKey !== OUR_SECRET_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // 檢查通過，回傳 "datatry" 的資料
    res.json(landDataTry);
});
// ===[ 新增 API 結束 ]===


// 6. 偵錯 API
app.get('/api/debug', (req, res) => {
    res.json({
        message: "這是一個偵錯用的端點",
        version: APP_VERSION,
        isSecretKeyPresent: !!process.env.API_SECRET_KEY, // 秘密金鑰是否存在 (true/false)
        secretKeyLength: process.env.API_SECRET_KEY ? process.env.API_SECRET_KEY.length : 0 // 秘密金鑰的長度
    });
});

// 7. 啟動伺服器
app.listen(PORT, '0.0.0.0', () => {
    console.log(`伺服器啟動！版本: ${APP_VERSION}。 API 金鑰存在狀態: ${!!process.env.API_SECRET_KEY}`);
});