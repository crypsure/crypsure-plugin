<template>
  <transition name="modal">
    <div v-if="show" class="crs-modal">
      <div class="crs-mask" @click="emit('cancel')" />
      <div class="crs-wrap">
        <div class="crs-plugin">
          <CrsHead :price="priceWithDecimal" />
          <div class="crs-amount"></div>
          <CrsPluginTypes
            v-model:pluginType="pluginType"
            :availableTypes="availableTypes"
          />
          <div class="crs-content-wrap">
            <transition name="plugin-content" mode="out-in">
              <CrsPluginChargebacks
                v-if="pluginType.name === 'chargebacks'"
                :prices="prices"
              />
              <CrsPluginPreorder
                v-else-if="pluginType.name === 'preorder'"
                :prices="prices"
              />
              <CrsPluginEscrow
                v-else-if="pluginType.name === 'escrow'"
                :prices="prices"
              />
            </transition>
            <div class="crs-secure">
              <img :src="IcLock" />
              <div>{{ ts('secure') }}</div>
            </div>
            <div class="crs-buttons">
              <div class="crs-continue" @click="emit('cancel')">
                {{ ts('continue') }}
              </div>
              <div class="crs-confirm" @click="confirm">
                {{ ts('confirm') }}
              </div>
            </div>
          </div>
          <div v-if="loading" class="crs-loading">
            <Loader />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  toRefs,
  onUpdated,
  reactive,
  PropType,
} from 'vue'
import { allPlugins, pluginTypes as defaultPluginTypes, usePrice } from '../util'
import { ts } from '../i18n'
import IcLock from '../../assets/img/ic_lock.png'
import CrsHead from './CrsHead.vue'
import CrsPluginTypes from './CrsPluginTypes.vue'
import CrsPluginChargebacks from './CrsPluginChargebacks.vue'
import CrsPluginPreorder from './CrsPluginPreorder.vue'
import CrsPluginEscrow from './CrsPluginEscrow.vue'
import { Loader } from './widgets'

const emit = defineEmits(['cancel'])

const props = defineProps({
  show: Boolean,
  initialType: {
    validator: (value: string | undefined) => allPlugins.includes(value ?? 'chargebacks'),
    default: 'chargebacks',
  },
  availableTypes: {
    type: Array as PropType<string[]>,
    validator: (value) =>
      value === null ||
      (Array.isArray(value) && value.every((v) => allPlugins.includes(v))),
    default: [],
  },
  store: {
    type: Object,
    default: undefined,
  },
  priceUsdCents: {
    type: Number,
    default: 0,
  },
})
const { initialType, availableTypes, store, priceUsdCents } = toRefs(props)

const pluginTypes = reactive(defaultPluginTypes)

const pluginType = ref(
  pluginTypes[initialType.value || (availableTypes.value || allPlugins)[0]],
)
const priceCents = computed(() =>
  store?.value ? store.value.totalPrice : priceUsdCents.value,
)
const priceCrs = computed(() => priceCents.value * 0.001848)
const priceEth = computed(() => priceCents.value * 0.0000084)
const prices = computed(() => ({
  priceUsd: priceCents.value,
  priceCrs: priceCrs.value,
  priceEth: priceEth.value,
}))

const loading = ref(false)

watch(initialType, (newVal: string) => {
  pluginType.value = pluginTypes[newVal]
})

const escapeListener = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('cancel')
  }
}

const confirm = () => {
  loading.value = true
}

const { priceWithDecimal } = usePrice(prices)

onUpdated(() => {
  for (const name of allPlugins) {
    const type = pluginTypes[name]
    const el = document.getElementById(type.selectId)
    if (el) {
      type.arrowPosition = `${el.offsetLeft + (el.offsetWidth - 20) / 2}px`
    }
  }
})
onMounted(() => {
  window.addEventListener('keyup', escapeListener)
})
onBeforeUnmount(() => {
  window.removeEventListener('keyup', escapeListener)
})
</script>

<style lang="postcss">
@import '../../css/defines.postcss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Variables for clients to override */
:root {
  --crs-color-text-dark: $text-main;
  --crs-color-text-form: $grey4;
  --crs-color-text-disabled: $disabled1;
}

.crs-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 40px;
}
.crs-mask {
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.crs-wrap {
  position: relative;
  width: 480px;
  background: white;
  display: flex;
  border-radius: 4px;
  margin-top: 5%;
  max-height: 90%;
  overflow-y: scroll;
  box-shadow: 0 4px 15px 12px rgba(150, 150, 150, 0.1);
}
.crs-loading {
  @mixin overlay;
  @mixin flex-center;
  background-color: rgba(0, 0, 0, 0.4);
}
.crs-plugin {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.crs-title {
  @mixin flex-center;
  @mixin title 24px;
  height: 80px;
  min-height: 80px;
  border-bottom: 1px solid #eee;
  color: $grey4;
}
.plugin-content-enter-active,
.plugin-content-leave-active {
  transition: opacity 0.35s ease;
}

.plugin-content-enter-from,
.plugin-content-leave-to {
  opacity: 0;
}
.crs-content-wrap {
  background-color: $grey4;
}
.crs-content-title {
  @mixin semibold 13px;
  @mixin flex-center;
  letter-spacing: 2px;
  color: $bg1;
  padding: 24px 0 16px;
}
.crs-content {
  @mixin flex-center-col;
  width: 340px;
  margin: 0 auto;
  background-color: white;
  border-radius: 4px;
  padding: 16px 16px 24px 8px;
  .crs-month,
  .crs-year {
    margin-right: 6px;
  }
  .crs-year {
    flex-grow: 1;
  }
}

.crs-content-row {
  display: flex;
  width: 100%;
  &:not(:first-child) {
    margin-top: 9px;
  }
}
.crs-select-title {
  @mixin flex-center;
  @mixin title 12px;
  justify-content: flex-end;
  color: $grey4;
  height: 34px;
  width: 120px;
  margin-right: 8px;
}
.crs-row-right {
  @mixin flex-center;
  @mixin medium 15px;
  justify-content: flex-start;
  flex-grow: 1;
}
.crs-price {
  @mixin select;
  color: var(--crs-color-text-dark);
  flex-grow: 1;
  position: relative;
  justify-content: flex-start;
}
.crs-currency {
  @mixin title 13px;
  color: $disabled1;
  position: absolute;
  right: 8px;
  top: 10px;
}
.crs-secure {
  @mixin text 13px;
  @mixin flex-center;
  color: $bg1;
  margin: 32px 0;
  img {
    height: 18px;
    margin-right: 8px;
  }
}
.crs-buttons {
  @mixin flex-center;
  height: 96px;
  background: white;
  > div {
    @mixin flex-center;
    height: 34px;
    @mixin title 10px;
    letter-spacing: 1.7px;
    padding: 0 24px;
    border-radius: 17px;
    cursor: pointer;
  }
}
.crs-continue {
  color: $grey4;
  border: 1px solid $border1;
  margin-right: 16px;
}
.crs-confirm {
  background-color: $primary;
  color: white;
}
@media (max-width: 600px) {
  .crs-modal {
    padding-left: 16px;
    padding-right: 16px;
  }
  .crs-types {
    font-size: 10px;
    > div {
      width: min-content;
    }
  }
  .crs-content {
    width: 100%;
  }
  .crs-buttons > div {
    padding: 0 12px;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s linear;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .crs-wrap,
.modal-leave-active .crs-wrap {
  transition:
    transform 0.3s cubic-bezier(0.5, 0, 0.5, 1),
    opacity 0.3s linear;
}
.modal-enter-from .crs-wrap,
.modal-leave-to .crs-wrap {
  opacity: 0;
  transform: scale(0.7) translateY(-10%);
}
</style>
