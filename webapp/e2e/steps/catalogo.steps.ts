import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/catalogo.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user view the details of a product', ({given,when,then}) => {

    given('An user in the home page', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('DeDe')
    });

    when('The user clicks on a product', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Playstation 5')
      await expect(text).toContain('IPhone 13')
      await expect(page).toClick('a', { text: 'Playstation 5' })
    });

    then('The product details page should be shown', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Peso')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});
