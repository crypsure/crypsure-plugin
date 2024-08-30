import { I18nObject, SimpleI18n, getString, getArray, getRecord } from './util'

// Provide fallback English plugin text, if none is provided
const fallback: I18nObject = {
  title: 'Crypsure',
  secure: 'Protected by Crypsure',
  crypsure: 'CRYPSURE',
  total: 'Total Amount',
  chargebacks: {
    label: 'DIRECT CHARGE',
    select: 'PAY WITH',
    select_label: 'Select Crypto',
    schedule: 'Schedule',
    protection: 'Charge Protection',
    price: 'Price',
    usd_price: 'USD Price',
    currency: {
      CRS: 'Crypsure (CRS)',
      ETH: 'Ethereum (ETH)',
    },
  },
  preorder: {
    label: 'PREORDER',
    select: 'Prepay for a future delivery:',
  },
  escrow: {
    label: 'ESCROW',
    enter: 'Place funds into escrow',
  },
  continue: 'CONTINUE SHOPPING',
  confirm: 'CONFIRM',
}

export const i18n = new SimpleI18n(fallback)
export const ts = getString(i18n)
export const ta = getArray(i18n)
export const tr = getRecord(i18n)
