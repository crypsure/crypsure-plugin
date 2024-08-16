<template>
  <transition name="modal">
    <div v-if="show" class="crs-plugin-modal">
      <div class="crs-plugin-mask" @click="emit('cancel')" />
      <div class="crs-plugin-wrap">
        <div class="crs-plugin">
          <div class="crs-plugin-title">
            {{ ts('title') }}
          </div>
          <CrsPluginTypes
            v-model:pluginType="pluginType"
            :availableTypes="availableTypes"
          />
          <div class="crs-plugin-content-wrap">
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
            <div class="crs-plugin-secure">
              <img :src="IcLock" />
              <div>{{ ts('secure') }}</div>
            </div>
            <div class="crs-plugin-buttons">
              <div class="crs-plugin-continue" @click="emit('cancel')">
                {{ ts('continue') }}
              </div>
              <div class="crs-plugin-confirm">
                {{ ts('confirm') }}
              </div>
            </div>
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
} from 'vue'
import { allPlugins, pluginTypes as defaultPluginTypes } from '../util'
import { ts } from '../i18n'
import IcLock from '../../assets/img/ic_lock.png'
import CrsPluginTypes from './CrsPluginTypes.vue'
import CrsPluginChargebacks from './CrsPluginChargebacks.vue'
import CrsPluginPreorder from './CrsPluginPreorder.vue'
import CrsPluginEscrow from './CrsPluginEscrow.vue'

const emit = defineEmits(['cancel'])

const props = defineProps({
  show: Boolean,
  initialType: {
    validator: (value: string) => allPlugins.includes(value),
    default: 'crypsure',
  },
  availableTypes: {
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
watch(initialType, (newVal: string) => {
  pluginType.value = pluginTypes[newVal]
})
const escapeListener = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('cancel')
  }
}

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

.crs-plugin-modal {
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
  .crs-plugin-mask {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .crs-plugin-wrap {
    position: relative;
    width: 480px;
    background: white;
    display: flex;
    border-radius: 4px;
    margin-top: 5%;
    max-height: 90%;
    overflow-y: scroll;
    box-shadow: 0 2px 15px 12px rgba(150, 150, 150, 0.2);
  }
  .crs-plugin {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .crs-plugin-title {
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
  .crs-plugin-content-wrap {
    background-color: $grey4;
  }
  .crs-plugin-content-title {
    @mixin text 17px;
    @mixin flex-center;
    color: $bg1;
    height: 96px;
  }
  .crs-plugin-content {
    @mixin flex-center-col;
    width: 340px;
    margin: 0 auto;
    background-color: white;
    border-radius: 4px;
    padding: 16px 16px 24px 8px;

    .crs-plugin-content-row {
      display: flex;
      width: 100%;
      &:not(:first-child) {
        margin-top: 9px;
      }
    }
    .crs-plugin-select-title {
      @mixin flex-center;
      @mixin title 12px;
      justify-content: flex-end;
      color: $grey4;
      height: 34px;
      width: 120px;
      margin-right: 8px;
    }
    .crs-plugin-row-right {
      @mixin flex-center;
      @mixin title-medium 15px;
      justify-content: flex-start;
      flex-grow: 1;
    }
    .crs-plugin-price {
      @mixin select;
      color: var(--crs-color-text-dark);
      flex-grow: 1;
      position: relative;
      justify-content: flex-start;
      .crs-plugin-currency {
        @mixin title 13px;
        color: $disabled1;
        position: absolute;
        right: 8px;
        top: 10px;
      }
    }
    .crs-plugin-month,
    .crs-plugin-year {
      margin-right: 6px;
    }
    .crs-plugin-year {
      flex-grow: 1;
    }
  }
  .crs-plugin-secure {
    @mixin text 13px;
    @mixin flex-center;
    color: $bg1;
    margin: 32px 0;
    img {
      height: 18px;
      margin-right: 8px;
    }
  }
  .crs-plugin-buttons {
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
    .crs-plugin-continue {
      color: $grey4;
      border: 1px solid $border1;
      margin-right: 16px;
    }
    .crs-plugin-confirm {
      background-color: $purple;
      color: white;
    }
  }
  @media (max-width: 600px) {
    padding-left: 16px;
    padding-right: 16px;
    .crs-plugin-types {
      font-size: 10px;
      > div {
        width: min-content;
      }
    }
    .crs-plugin-content {
      width: 100%;
    }
    .crs-plugin-buttons > div {
      padding: 0 12px;
    }
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

.modal-enter-active .crs-plugin-wrap,
.modal-leave-active .crs-plugin-wrap {
  transition:
    transform 0.3s cubic-bezier(0.5, 0, 0.5, 1),
    opacity 0.3s linear;
}
.modal-enter-from .crs-plugin-wrap,
.modal-leave-to .crs-plugin-wrap {
  opacity: 0;
  transform: scale(0.7) translateY(-10%);
}
</style>
