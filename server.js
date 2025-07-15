// 1. 引入我們需要的套件
const express = require('express');
const cors = require('cors');
const landData = require('./data.json');

// 2. 讀取秘密金鑰，並設定一個版本號，方便我們辨識
const OUR_SECRET_KEY = process.env.API_SECRET_KEY;
const APP_VERSION = "1.2"; // <--- 這是一個新的版本號

// 3. 建立 Express 應用程式
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// 4. 原本的 API (使用改良後的檢查邏輯)
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

// ===[ 5. 新增的偵錯 API ]===
app.get('/api/debug', (req, res) => {
    res.json({
        message: "這是一個偵錯用的端點",
        version: APP_VERSION,
        isSecretKeyPresent: !!process.env.API_SECRET_KEY, // 秘密金鑰是否存在 (true/false)
        secretKeyLength: process.env.API_SECRET_KEY ? process.env.API_SECRET_KEY.length : 0 // 秘密金鑰的長度
    });
});
// ===[ 偵錯 API 結束 ]===

// 6. 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器啟動！版本: ${APP_VERSION}。 API 金鑰存在狀態: ${!!process.env.API_SECRET_KEY}`);
});