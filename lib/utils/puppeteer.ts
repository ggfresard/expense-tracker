import { ElementHandle, Page } from 'puppeteer-core'

export const getPageUtilities = (page: Page) => {
  return {
    async clickButtonWithContent(content: string) {
      const button = await page.$x(`//button[contains(text(), "${content}")]`)
      if (button === null || !button.length)
        throw new Error(`Button with content "${content}" not found`)
      for (const b of button) {
        try {
          await (b as ElementHandle).click()
          return
        } catch (e) {
          console.log('Element not clickable')
        }
      }
    },
  }
}
