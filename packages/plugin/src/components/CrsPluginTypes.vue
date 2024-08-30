<template>
  <div class="crs-types-wrap">
    <div class="crs-types">
      <div
        v-for="plugin in plugins"
        :id="pluginTypes[plugin].selectId"
        :key="plugin"
        :class="{ active: pluginType.name === plugin }"
        @click="emit('update:pluginType', pluginTypes[plugin])"
      >
        {{ ts(`${plugin}.label`) }}
      </div>
    </div>
    <div class="crs-types-arrow" :style="{ left: pluginType.arrowPosition }" />
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { allPlugins, pluginTypes } from '../util'
import { ts } from '../i18n'
import { PluginType } from '../i-plugin'

const props = defineProps<{
  pluginType: PluginType
  availableTypes: string[]
}>()

const { availableTypes } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:pluginType', plugin: PluginType): void
}>()

const plugins = computed(() => availableTypes.value || allPlugins)
</script>

<style lang="postcss">
@import '../../css/defines.postcss';

.crs-types-wrap {
  position: relative;
}

.crs-types {
  @mixin flex-center;
  @mixin title 11px;
  color: $bg1;
  letter-spacing: 1.8px;
  height: 56px;
  > div {
    @mixin flex-center;
    padding: 0 16px;
    cursor: pointer;
    border-radius: 14px;
    height: 28px;
    &.active {
      background-color: $primary;
      color: black;
    }
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
.crs-types-arrow {
  width: 0;
  height: 0;
  bottom: -1px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid $grey4;
  transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.crs-type {
  height: 48px;
  display: flex;
}
</style>
