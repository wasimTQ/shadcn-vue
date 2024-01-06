<script setup lang="ts">
import { type SplitpaneProps, Splitpanes } from 'splitpanes'
import { useProvideResizable } from './useResizable'
import { cn } from '@/lib/utils'
import 'splitpanes/dist/splitpanes.css'

const props = withDefaults(defineProps<Partial<SplitpaneProps>>(), {
  dblClickSplitter: false,
})
const { paneGroupContainerRef, setValuesResizedByPointer } = useProvideResizable({
  orientation: props.horizontal ? 'horizontal' : 'vertical',
})
</script>

<template>
  <div ref="paneGroupContainerRef" :class="cn('w-full h-full')">
    <Splitpanes
      class="text-black text-3xl"
      v-bind="props"
      @resized="setValuesResizedByPointer"
    >
      <slot />
    </Splitpanes>
  </div>
</template>

<style>
.splitpanes {background-color: #f8f8f8;}

.splitpanes__splitter {
  @apply focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1;
}

.splitpanes--horizontal > .splitpanes__splitter {
  @apply relative flex items-center justify-center bg-border h-px w-full after:absolute after:left-0 after:bottom-0 after:h-2 after:w-full after:translate-y-1/2 after:translate-x-0;
}

.splitpanes--vertical > .splitpanes__splitter {
  @apply relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2;
}
</style>
