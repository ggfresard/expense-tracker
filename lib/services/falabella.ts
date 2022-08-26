import puppeteer from 'puppeteer'
import hello from '../../pages/api/hello'
import { currencyToNumber, wait } from '../utils'
import { getPageUtilities } from '../utils/puppeteer'

export const getCMRData = async () => {
  const browser = await puppeteer.launch({
    slowMo: 100,
    headless: false,
  })
  try {
    const page = await browser.newPage()
    page.emulate({
      viewport: {
        width: 1920,
        height: 1080,
      },
      userAgent: '',
    })
    const pageUtils = getPageUtilities(page)
    await page.goto('https://www.bancofalabella.cl/')
    await wait(1000)
    await pageUtils.clickButtonWithContent('Mi Cuenta')
    await page.type('input[formcontrolname="user"]', process.env.RUT as string)
    await page.type(
      'input[formcontrolname="password"]',
      process.env.PASSWORD as string
    )
    await pageUtils.clickButtonWithContent('❯')
    await wait(15000)

    const data = await page.evaluate(() => {
      const creditContainer = document.querySelector('app-credit-cards')
      const data = {
        total: creditContainer?.children[0].children[1].children[0].children[0]
          .innerHTML as string,
        used: creditContainer?.children[0].children[4].children[0].children[0]
          .innerHTML as string,
        available: creditContainer?.children[0].children[7].children[0]
          .children[0].innerHTML as string,
      }
      return data
    })
    browser.close()
    return Object.keys(data).reduce(
      (acc, key) => ({
        ...acc,
        [key]: currencyToNumber(data[key as keyof typeof data]),
      }),
      {}
    )
  } catch (error) {
    console.log(error)
    browser.close()
  }
}
