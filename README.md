# restaurant_List 打造餐廳清單
## 介紹
**用 Express 建立一個簡單的網路應用程式，包括：**
* 讀取 JSON 檔案，將種子資料載入應用程式
* 把資料帶入 handlebars 樣板中動態呈現
* 操作 handlebars 中的 each 迴圈呈現出多張餐廳卡片
* 應用 params 打造動態路由
* 用 Query String 打造搜尋功能
* 點擊圖片時顯示餐廳的詳細信息。

## 頁面呈現
<p float="left"><img src="https://github.com/singingw/restaurant_List/blob/main/restaurant_List.PNG" width="49%">
<img src="https://github.com/singingw/restaurant_List/blob/main/%E9%A4%90%E5%BB%B3%E7%9A%84%E8%A9%B3%E7%B4%B0%E8%B3%87%E8%A8%8A.PNG" width="49%"></p>

## 功能
* 查看所有餐廳
* 瀏覽餐廳的詳細資訊
* 使用關鍵字搜索餐廳
* 連結餐廳的地址到 Google 地圖

## 安裝與執行步驟
１.  在終端機輸入指令 Clone 此專案至本機電腦
```js
git clone https://github.com/singingw/restaurant_List.git
```
２.  移至檔案夾
```js
cd restaurant_List
```
３.  安裝相關套件
```js
npm install
```
４.  打開終端
```js
nodemon app.js
```
５.  使用瀏覽器開啟：http://localhost:3000 即可瀏覽本專案

## 環境建置與需求
１.  Node.js & npm - JavaScript 運行環境

２.  Express.js - Web 應用程序框架

３.  Express-Handlebars - 模板引擎
