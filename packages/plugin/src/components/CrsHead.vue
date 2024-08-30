<template>
  <div>
    <div class="crs-head">
      <Logo class="crs-logo" />
      <div class="crs-close-wrap" @click="emit('cancel')">
        <X class="crs-close" />
      </div>
    </div>
    <div class="crs-head-price">
      <div class="crs-total">
        {{ ts('total') }}
      </div>
      <div>{{ price }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ts } from '../i18n'
import { X, Logo } from './widgets'

defineProps<{
  price: string
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
}>()
</script>

<style lang="postcss">
@import '../../css/defines.postcss';

.crs-head {
  @mixin flex-center;
  width: 100%;
  height: 72px;
  position: relative;
}
.crs-logo {
  width: 140px;
}
.crs-close-wrap {
  @mixin flex-center;
  position: absolute;
  right: 12px;
  top: 8px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 50%;
}
.crs-close {
  width: 8px;
  height: 8px;
}
.crs-head-price {
  @mixin semibold 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 124px;
  background-color: $dark3;
  color: white;
}
.crs-total {
  font-size: 12px;
}
</style>
