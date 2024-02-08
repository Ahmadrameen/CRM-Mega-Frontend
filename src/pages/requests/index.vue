<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { MoreHorizontal } from 'lucide-vue-next'
import { deleteRequest } from '~/api/requests/delete-request'
import { getRequests } from '~/api/requests/get-requests'
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()

const { data: requests, isPending, refetch } = useQuery({
  queryKey: ['requests'],
  queryFn: getRequests,
})

const { mutate } = useMutation({
  mutationFn: (id: string) => deleteRequest(id),

  onSuccess: () => {
    refetch()

    toast({
      title: 'Request deleted',
    })
  },
})
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between my-4">
      <h2 class="text-xl font-semibold">
        Requests
      </h2>

      <Button>
        <RouterLink to="/requests/create">
          Create Request
        </RouterLink>
      </Button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableLoading v-if="isPending" :cells="5" />
        <TableEmpty v-else-if="requests?.data.data.length === 0" :colspan="5">
          <p>No data</p>
        </TableEmpty>

        <TableRow v-for="request in requests?.data.data" v-else :key="request.id">
          <TableCell>{{ request.customer.firstname }}</TableCell>
          <TableCell>{{ request.customer.lastname }}</TableCell>
          <TableCell>{{ request.customer.phone }}</TableCell>
          <TableCell>
            <Badge :variant="request.status.id === 2 ? 'default' : 'secondary'">
              {{ request.status.name }}
            </Badge>
          </TableCell>
          <TableCell class="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem @click="$router.push(`/requests/history/${request.id}`)">
                  History
                </DropdownMenuItem>
                <DropdownMenuItem @click="$router.push(`/requests/${request.id}`)">
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem @select="(e) => e.preventDefault()">
                  <AlertDialog>
                    <AlertDialogTrigger>Delete</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction @click="mutate(request.id.toString())">
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
