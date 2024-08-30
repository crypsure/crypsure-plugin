<template>
  <div class="crs-chargebacks">
    <div class="crs-content-title">
      {{ ts('chargebacks.select') }}
    </div>
    <div class="crs-content">
      <div class="crs-content-row">
        <div class="crs-select-title">
          {{ ts('chargebacks.usd_price') }}
        </div>
        <div class="crs-row-right">
          {{ priceUsd }}
        </div>
      </div>
      <div class="crs-content-row">
        <div class="crs-select-title">
          {{ ts('chargebacks.select_label') }}
        </div>
        <CrsSelect
          v-model="currency"
          :options="tr('chargebacks.currency') as Record<string, string>"
          class="crs-row-right"
        />
      </div>
      <div class="crs-content-row">
        <div class="crs-select-title">
          {{ ts('chargebacks.price') }}
        </div>
        <div class="crs-row-right">
          <div class="crs-price">
            {{ roundedPrice || '0' }}
            <div class="crs-currency">
              {{ currency }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { ts, tr } from '../i18n'
import { CrsSelect } from '../components'
import { usePrice } from '../util'

const props = withDefaults(
  defineProps<{
    prices: Record<string, number>
  }>(),
  {
    prices: () => ({ priceEth: 0, priceCrs: 0, priceUsd: 0 }),
  },
)
const { prices } = toRefs(props)

const { currency, roundedPrice, priceUsd } = usePrice(prices)
</script>

<style lang="postcss">
.crs-chargebacks {
}
</style>
