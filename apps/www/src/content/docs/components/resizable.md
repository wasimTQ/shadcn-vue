---
title: Resizable
description: A control that allows the user to toggle between checked and not checked.
source: apps/www/src/lib/registry/default/ui/resizable 
primitive: https://www.radix-vue.com/components/resizable.html
---


<ComponentPreview name="ResizableDemo"  /> 


## Installation
 

```bash
npx shadcn-vue@latest add resizable
``` 

## Usage

```vue
<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Checkbox id="terms" />
</template>
```

## Examples

### With text

<ComponentPreview name="CheckboxWithText" />

### Disabled

<ComponentPreview name="CheckboxDisabled"  />

### Form

Please first read `vee-validate` section for [Checkbox and Radio Inputs](https://vee-validate.logaretm.com/v4/examples/checkboxes-and-radio/)

<ComponentPreview name="CheckboxFormSingle" />

<ComponentPreview name="CheckboxFormMultiple" />
