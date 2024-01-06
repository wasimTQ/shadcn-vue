<script setup lang="ts">
import { Pane } from 'splitpanes'
import { computed, ref } from 'vue'
import { watchOnce } from '@vueuse/core'
import { useResizable } from './useResizable'
import 'splitpanes/dist/splitpanes.css'

const props = defineProps<Partial<{
  minSize: number
  maxSize: number
  defaultSize: number
}>>()

const paneRef = ref(null)
const paneId = ref(Symbol(Math.random()))
const { addNewPane, paneSizes } = useResizable()

const paneSize = computed(() => paneSizes.get(paneId.value))

const computedDefaultSize = computed(() => {
  if (!props.defaultSize)
    return null
  if (props.maxSize && props.defaultSize > props.maxSize)
    return props.maxSize
  if (props.minSize && props.defaultSize < props.minSize)
    return props.minSize

  return props.defaultSize
})

watchOnce(paneRef, () => {
  addNewPane(paneRef.value, paneId.value)
})
</script>

<template>
  <Pane ref="paneRef" :size="paneSize ?? computedDefaultSize" v-bind="props" @update="() => console.log('Updated')">
    <slot />
  </Pane>
</template>
