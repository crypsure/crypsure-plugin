<template>
  <div class="crs-preorder">
    <div class="crs-content-title">
      {{ ts('preorder.select') }}
    </div>
    <div class="crs-content">
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
          {{ ts('chargebacks.schedule') }}
        </div>
        <div class="crs-row-right">
          <CrsSelect
            v-model="year"
            :disabled="true"
            :options="['2021', '2022', '2023']"
            class="crs-year"
          />
          <CrsSelect
            v-model="month"
            :disabled="true"
            :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
            class="crs-month"
          />
          <CrsSelect v-model="day" :options="[day]" :disabled="true" />
        </div>
      </div>
      <div class="crs-content-row">
        <div class="crs-select-title">
          {{ ts('chargebacks.protection') }}
        </div>
        <CrsSelect
          v-model="protection"
          :options="[
            '0%',
            '5%',
            '10%',
            '15%',
            '20%',
            '25%',
            '30%',
            '35%',
            '40%',
            '45%',
            '50%',
          ]"
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
import { ref, toRefs } from 'vue'
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

const month = ref(1)
const day = ref(16)
const year = ref('2021')
const protection = ref('0%')
</script>

<style lang="postcss">
.crs-preorder {
}
</style>
