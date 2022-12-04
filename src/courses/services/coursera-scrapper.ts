import * as puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseraScrapper {
  async generateCategoryList(
    category: string,
  ): Promise<Record<string, string>[]> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.goto(
      `https://www.coursera.org/search?index=prod_all_launched_products_term_optimization&topic=${category}`,
    );
    let results: Record<string, string>[]; //gets collection of data

    const lastPageNum = 1; // We're only fetching data from first page since i don't want to get block by coursera
    const resultsSelector = '#rendered-content main ul li';
    await page.waitForSelector(resultsSelector);

    for (let index = 0; index < lastPageNum; index++) {
      results = results.concat(await this.resultedData(page, resultsSelector));
      if (index != lastPageNum - 1) {
        await page.waitForSelector(
          '[data-e2e="pagination-controls"] div > :nth-last-child(1)',
        );
        await page.click(
          '[data-e2e="pagination-controls"] div > :nth-last-child(1)',
        );
      }
    }
    await browser.close();
    return results;
  }
  async resultedData(page, resultsSelector): Promise<Record<string, string>> {
    return await page.evaluate((resultsSelector) => {
      return [...document.querySelectorAll(resultsSelector)].map((result) => {
        const title = result?.querySelector('h2')?.innerText;
        const description = result?.querySelector('p')?.innerText;
        const searchCard = result?.querySelector('[data-e2e="SearchCard"]');
        const provider = searchCard?.querySelector(
          ':nth-child(2) > :nth-child(1) > :nth-child(1) span',
        )?.textContent;
        const rating = searchCard?.querySelector(
          ':nth-child(2) > :nth-child(2) p',
        )?.textContent;
        let duration = searchCard?.querySelector(
          ':nth-child(2) > :nth-child(2) > p',
        )?.textContent;
        duration = duration?.match(/[^ ]* [^ ]*$/g).toString();
        return { title, description, provider, rating, duration };
      });
    }, resultsSelector);
  }
}
