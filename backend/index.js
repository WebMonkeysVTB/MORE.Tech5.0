"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.get('/addresses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://headless-cms3.vtb.ru/projects/atm/models/default/items/departments");
    let json = response.data;
    res.send(json);
}));
// app.get('/addresses', async (req, res) => {
//   async function getDepartmentAddresses(pageNo: number) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     page.setDefaultNavigationTimeout(2 * 60 * 1000);
//     await page.goto('https://www.banki.ru/banks/bank/vtb/branches/moskva/#/!b1:327!s3:office!s4:list!m4:1!p1:2');
//     if (!Number.isInteger(pageNo) || pageNo <= 0) {
//       pageNo = 1;
//     }
//     await page.waitForSelector('ui-pagination__list');
//     await page.click(`.ui-pagination__item[data-page="${pageNo}"]`);
//     await page.waitForSelector('.list');
//     const addresses = await page.evaluate(() => {
//       return Array.from(document.querySelectorAll('.item__location__address__link')).map(item => item.textContent);
//     })
//     console.log(addresses);
//     // await page.screenshot({
//     //   path: "screenshot.jpg"
//     // });
//     await browser.close();
//     return addresses;
//   };
//   const pages = [1,2,3];
//   let result = await Promise.all(pages.map(pageNo => getDepartmentAddresses(pageNo) ) );
//   res.send(result);
// })
