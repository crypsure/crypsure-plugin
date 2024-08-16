<template>
  <div class="crs-plugin-chargebacks">
    <div class="crs-plugin-content-title">
      {{ ts('chargebacks.select') }}
    </div>
    <div class="crs-plugin-content">
      <div class="crs-plugin-content-row">
        <div class="crs-plugin-select-title">
          {{ ts('chargebacks.usd_price') }}
        </div>
        <div class="crs-plugin-row-right">
          {{ priceUsd }}
        </div>
      </div>
      <div class="crs-plugin-content-row">
        <div class="crs-plugin-select-title">
          {{ ts('chargebacks.select_label') }}
        </div>
        <CrsSelect
          v-model="currency"
          :options="(tr('chargebacks.currency') as Record<string, string>)"
          class="crs-plugin-row-right"
        />
      </div>
      <div class="crs-plugin-content-row">
        <div class="crs-plugin-select-title">
          {{ ts('chargebacks.price') }}
        </div>
        <div class="crs-plugin-row-right">
          <div class="crs-plugin-price">
            {{ roundedPrice || '0' }}
            <div class="crs-plugin-currency">
              {{ currency }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
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

const { currency, roundedPrice } = usePrice(prices)

const priceUsd = computed(() => {
  return `$${(prices.value.priceUsd / 100).toLocaleString()}`
})
</script>

<style lang="postcss">
.crs-plugin-chargebacks {
}
</style>
