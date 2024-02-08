<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { Loader } from 'lucide-vue-next'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '~/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  as?: string
  class?: HTMLAttributes['class']
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="isLoading"
  >
    <Loader v-if="isLoading" class="w-5 h-5 animate-spin mr-2.5" />
    <slot />
  </Primitive>
</template>
