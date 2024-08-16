<template>
  <div class="crs-plugin-escrow">
    <div class="crs-plugin-content-title">
      {{ ts('escrow.enter') }}
    </div>
    <div class="crs-plugin-content">
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
          {{ ts('chargebacks.schedule') }}
        </div>
        <div class="crs-plugin-row-right">
          <CrsSelect
            v-model="year"
            :options="['2021', '2022', '2023']"
            class="crs-plugin-year"
          />
          <CrsSelect
            v-model="month"
            :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
            class="crs-plugin-month"
            @update:modelValue="days = getDays($event)"
          />
          <CrsSelect v-model="day" :options="days" />
        </div>
      </div>
      <div class="crs-plugin-content-row">
        <div class="crs-plugin-select-title">
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
import { ref, toRefs } from 'vue'
import { ts, tr } from '../i18n'
import { CrsSelect } from '../components'
import { usePrice } from '../util'

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

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

const getDays = (month: number) => [...Array(monthDays[month - 1] + 1).keys()].slice(1)

const month = ref(1)
const days = getDays(1)
const day = ref(1)
const year = ref('2021')
const protection = ref('0%')
</script>

<style lang="postcss">
.crs-plugin-escrow {
}
</style>
