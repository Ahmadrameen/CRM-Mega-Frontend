<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { MoreHorizontal } from 'lucide-vue-next'
import { getUsers } from '../../api/users/get-users'
import { useToast } from '~/components/ui/toast'
import { deleteUser } from '~/api/users/delete-user'

const { toast } = useToast()

const { data: users, isPending, refetch } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
})

const { mutate } = useMutation({
  mutationFn: (id: string) => deleteUser(id),

  onSuccess: () => {
    refetch()

    toast({
      title: 'User deleted',
    })
  },
})
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between my-4">
      <h2 class="text-xl font-semibold">
        User
      </h2>

      <Button>
        <RouterLink to="/users/create">
          Create User
        </RouterLink>
      </Button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead class="text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableLoading v-if="isPending" :cells="5" />
        <TableEmpty v-else-if="users?.data.data.length === 0" :colspan="5">
          <p>No data</p>
        </TableEmpty>

        <TableRow v-for="user in users?.data.data" v-else :key="user.id">
          <TableCell>{{ user.name }}</TableCell>
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>
            <Badge variant="outline">
              {{ user.role }}
            </Badge>
          </TableCell>

          <TableCell class="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem @click="$router.push(`/users/${user.id}`)">
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
                        <AlertDialogAction @click="mutate(user.id.toString())">
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
