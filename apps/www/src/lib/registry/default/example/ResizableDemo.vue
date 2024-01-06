<script setup lang="ts">
import { Resizable, ResizablePanel } from '@/lib/registry/default/ui/resizable'
</script>

<template>
  <div class="flex items-center w-full !h-[400px]">
    <Resizable>
      <ResizablePanel :min-size="20" :max-size="70" :default-size="80">
        <span>1</span>
      </ResizablePanel>
      <ResizablePanel>
        <Resizable horizontal>
          <ResizablePanel>
            <span>2</span>
          </ResizablePanel>
          <ResizablePanel>
            <span>4</span>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
      <ResizablePanel :max-size="70">
        <span>3</span>
      </ResizablePanel>
    </Resizable>
  </div>
</template>
