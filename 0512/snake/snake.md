# 貪吃蛇 PWA 專案

## 專案結構

```
貪吃蛇/
├── index.html       # 主頁面
├── manifest.json    # PWA 設定檔
├── sw.js            # Service Worker（離線支援）
├── style.css        # 樣式表
├── game.js          # 遊戲邏輯
└── icons/           # 圖示
    ├── icon-192.png
    └── icon-512.png
```

## 功能說明

| 功能 | 描述 |
|------|------|
| 遊戲控制 | 鍵盤方向鍵 / WASD / 手機虛擬按鍵 + 滑動 |
| 計分系統 | 吃食物 +10 分，顯示最高分 |
| 難度選擇 | 簡單、中等、困難 三種速度 |
| PWA 支援 | 可安裝為 App，支援離線遊玩 |
| 響應式設計 | 電腦與手機皆可流暢遊玩 |

## 操作說明

1. **電腦**：使用 ↑↓←→ 方向鍵或 WASD 控制蛇的方向
2. **手機**：點擊虛擬方向鍵 或 滑動螢幕控制方向
3. **暫停**：按空格鍵暫停/繼續遊戲

## 執行方式

需要透過本地伺服器執行（因為 Service Worker 需要 HTTP）：

- **VS Code**：安裝 Live Server 擴充功能
- **Python**：`python -m http.server 8000`
- **Node.js**：`npx serve`

然後瀏覽 `http://localhost:8000`

## 技術栈

- HTML5 Canvas
- JavaScript (ES6)
- Service Worker API
- Web App Manifest
- localStorage

## 安裝為 App

在瀏覽器開啟後，若看到「安裝」提示，即可將遊戲安裝為獨立 App。