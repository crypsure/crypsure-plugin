<template>
  <div class="payment-options">
    <div v-for="(plugin, idx) in plugins" :key="idx">
      <Checkbox
        v-model="plugin.checked"
        class="crs-check"
        :label="`Enable ${plugin.name}`"
      />
      <div
        v-if="plugin.checked"
        class="payment-crypsure title"
        @click="emit('update:modelValue', plugin.name)"
      >
        {{ plugin.name }}
      </div>
      <div v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Checkbox } from '@crypsure/plugin'

interface CheckedPlugin {
  name: string
  checked: boolean
}

defineProps<{
  modelValue: string | null
  plugins: CheckedPlugin[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string | null): void
}>()
</script>
