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
const puppeteer_1 = __importDefault(require("puppeteer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.get('/addresses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function getDepartmentAddresses(pageNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            page.setDefaultNavigationTimeout(2 * 60 * 1000);
            yield page.goto('https://www.banki.ru/banks/bank/vtb/branches/moskva/#/!b1:327!s3:office!s4:list!m4:1!p1:2');
            if (!Number.isInteger(pageNo) || pageNo <= 0) {
                pageNo = 1;
            }
            yield page.waitForSelector('ui-pagination__list');
            yield page.click(`.ui-pagination__item[data-page="${pageNo}"]`);
            yield page.waitForSelector('.list');
            const addresses = yield page.evaluate(() => {
                return Array.from(document.querySelectorAll('.item__location__address__link')).map(item => item.textContent);
            });
            console.log(addresses);
            // await page.screenshot({
            //   path: "screenshot.jpg"
            // });
            yield browser.close();
            return addresses;
        });
    }
    ;
    const pages = [1, 2, 3];
    let result = yield Promise.all(pages.map(pageNo => getDepartmentAddresses(pageNo)));
    res.send(result);
}));
