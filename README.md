# restaurant_List 打造餐廳清單
## 功能描述
* 使用者可自行創建帳號，或使用 Facebook、Google 登入
* 使用者可在首頁看到自己所有的餐廳清單
* 以喜歡的排序方式或類別進行瀏覽
* 可新增、編輯、刪除餐廳資訊
* 點擊餐廳或更多可以看到此餐廳的詳細介紹
* 利用搜尋功能尋找餐廳 (搜尋名稱或分類)
* 當使用者輸入的關鍵字搜尋不到餐廳時，會顯示搜尋不到結果

## 頁面呈現
<p float="left"><img src="https://github.com/singingw/restaurant_List/blob/main/restaurant_List.PNG" width="49%">
<img src="https://github.com/singingw/restaurant_List/blob/main/%E9%A4%90%E5%BB%B3%E7%9A%84%E8%A9%B3%E7%B4%B0%E8%B3%87%E8%A8%8A.PNG" width="49%"></p>

## 安裝與執行步驟
1.  在終端機輸入指令 Clone 此專案至本機電腦
```js
git clone https://github.com/singingw/restaurant_list.git
```
2.  移至檔案夾
```js
cd restaurant_List
```
3.  安裝相關套件
```js
npm install
```
4.  process.env.MONGODB_URI 環境變數的設定
```js
set MONGODB_URI = < 連線 mongoDB 的 URI > //密碼、資料庫名稱要自行更改
```
5.  運行種子數據
```js
node models/seeds/userSeeder.js
node models/seeds/restaurantSeeder.js
```
6.  打開終端
```js
npm run dev
```
7.  使用瀏覽器開啟：http://localhost:3000 即可瀏覽本專案

## 環境建置與需求
1. Node.js & npm - JavaScript 運行環境
2. Express.js - Web 應用程序框架
3. Express-Handlebars - 模板引擎
4. mongoDB 資料庫
5. mongoose
6. passport 
