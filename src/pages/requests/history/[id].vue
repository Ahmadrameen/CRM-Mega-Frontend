<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getRequestHistory } from '~/api/requests/get-request-history'

const route = useRoute('/requests/history/[id]')
const params = route.params

const { data: requestHistory, isPending } = useQuery({
  queryKey: ['request', 'history', params.id],
  queryFn: () => getRequestHistory(params.id),
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Request history</CardTitle>
    </CardHeader>

    <CardContent>
      <div class="space-y-5">
        <template v-if="isPending">
          <Skeleton v-for="i in 3" :key="i" class="h-10 w-full" />
        </template>

        <p v-if="requestHistory?.data.data.length === 0">
          No Data
        </p>

        <template v-for="history in requestHistory?.data.data" :key="history.id">
          <Alert>
            <AlertTitle class="flex items-center gap-4 justify-between mb-4">
              <span>{{ history.action }} {{ history.user }}</span>
              <span>{{ new Intl.DateTimeFormat('ru-Ru').format(new Date(history.created_at)) }}</span>
            </AlertTitle>
            <AlertDescription>
              {{ history.note }}
            </AlertDescription>
          </Alert>
        </template>
      </div>
    </CardContent>
  </Card>
</template>
