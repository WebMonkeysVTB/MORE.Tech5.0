import express, {Express, Request, Response} from 'express';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/addresses', async (req, res) => {
  async function getDepartmentAddresses(pageNo: number) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
  
    await page.goto('https://www.banki.ru/banks/bank/vtb/branches/moskva/#/!b1:327!s3:office!s4:list!m4:1!p1:2');

    if (!Number.isInteger(pageNo) || pageNo <= 0) {
      pageNo = 1;
    }
    await page.waitForSelector('ui-pagination__list');
    await page.click(`.ui-pagination__item[data-page="${pageNo}"]`);

    await page.waitForSelector('.list');

    const addresses = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.item__location__address__link')).map(item => item.textContent);
    })

    console.log(addresses);
    
    // await page.screenshot({
    //   path: "screenshot.jpg"
    // });
  
    await browser.close();
    return addresses;
  };

  const pages = [1,2,3];

  let result = await Promise.all(pages.map(pageNo => getDepartmentAddresses(pageNo) ) );
  res.send(result);
})