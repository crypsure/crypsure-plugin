<template>
  <Dropdown
    :modelValue="open"
    transition="crs-select"
    class="crs-select"
    :class="{ open, disabled }"
    :interactive="false"
    @update:modelValue="setOpen"
  >
    <div class="crs-select-value">
      <div>{{ sOptions[modelValue] }}</div>
      <Caret />
    </div>
    <template #dropdown>
      <div
        v-for="opt in unselected"
        :key="opt"
        class="crs-select-item"
        @click="select(opt)"
      >
        {{ sOptions[opt] }}
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue'
import { Caret, Dropdown } from '../widgets'

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(
  defineProps<{
    modelValue: string | number
    options: Record<string, string> | Array<string | number>
    disabled?: boolean
  }>(),
  {
    modelValue: '',
    options: () => [],
    disabled: false,
  },
)
const { options, modelValue, disabled } = toRefs(props)

const open = ref(false)

const sOptions = computed(() => {
  if (Array.isArray(options.value)) {
    const obj: Record<string, string> = {}
    for (const option of options.value) {
      obj[option] = option.toString()
    }
    return obj
  }
  return options.value
})
const unselected = computed(() =>
  Object.keys(sOptions.value).filter((opt) => opt !== modelValue.value),
)
const select = (option: string) => {
  emit('update:modelValue', option)
  open.value = false
}
const setOpen = (newOpen: boolean) => {
  open.value = !disabled.value && newOpen
}
</script>

<style lang="postcss">
@import '../../../css/defines.postcss';

.crs-select-value {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.crs-select {
  @mixin select;
  color: var(--crs-color-text-form);
  .crs-select-value .caret {
    border-color: $disabled1;
    margin-top: 4px;
  }
  &.open {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  &.disabled {
    cursor: default;
    background-color: #ddd;
    color: var(--crs-color-text-disabled);
    .crs-select-value .caret {
      border-color: var(--crs-color-text-disabled);
    }
  }
}
.dropdown-menu {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.crs-select-item {
  @mixin text 14px;
  @mixin flex-center;
  justify-content: flex-start;
  height: 34px;
  padding: 0 16px;
  background-color: $bg2;
  border-top: 1px solid $border1;
  &:hover {
    background-color: $bg3;
  }
}
.crs-select-enter-active,
.crs-select-leave-active {
  transition: all 250ms;
  transition-timing-function: cubic-bezier(0.53, 2, 0.36, 0.85);
}
.crs-select-enter-from,
.crs-select-leave-active {
  opacity: 0;
}
.crs-select-enter-from,
.crs-select-leave-to {
  position: absolute;
}
.crs-select-enter-from {
  transform: translateY(-10px);
}
.crs-select-leave-active {
  transform: translateY(10px);
}
</style>
