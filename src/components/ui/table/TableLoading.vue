<script setup lang="ts">
import TableRow from './TableRow.vue'
import TableCell from './TableCell.vue'

defineProps<{ cells: number }>()
</script>

<template>
  <TableRow v-for="(_, index) in 10" :key="index">
    <TableCell v-for="(_, i) in cells" :key="i">
      <Skeleton class=" w-full h-3" />
    </TableCell>
  </TableRow>
</template>
