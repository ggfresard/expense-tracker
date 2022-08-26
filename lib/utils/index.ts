export const wait = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export const currencyToNumber = (currency: string) =>
  parseFloat(
    currency
      .split('')
      .filter((char) => '0123456789'.includes(char))
      .join('')
  )
