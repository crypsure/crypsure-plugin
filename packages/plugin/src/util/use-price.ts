import { computed, Ref, ref } from 'vue'

export const round = (n: number): number =>
  Math.round((n + Number.EPSILON) * 1000000) / 1000000

export const usePrice = (prices: Ref<Record<string, number>>) => {
  const currency = ref('CRS')

  const roundedPrice = computed(() =>
    round(currency.value === 'ETH' ? prices.value.priceEth : prices.value.priceCrs),
  )

  const priceWithDecimal = computed(() => {
    const price = (prices.value.priceUsd / 100).toLocaleString()
    return `$${price}${price.includes('.') ? '' : '.00'}`
  })

  const priceUsd = computed(() => {
    return `$${(prices.value.priceUsd / 100).toLocaleString()}`
  })

  return { currency, roundedPrice, priceUsd, priceWithDecimal }
}
