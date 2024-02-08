<script setup lang="ts">
import { Field as FormField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { getRoles } from '~/api/roles/get-roles'
import { useToast } from '~/components/ui/toast'
import { getUser } from '~/api/users/get-user'
import type { EditUserProps } from '~/api/users/edit-user'
import { editUser } from '~/api/users/edit-user'

const router = useRouter()
const route = useRoute('/users/[id]')
const params = route.params

const { toast } = useToast()

const { data: user, isFetching, isSuccess } = useQuery({
  queryKey: ['user', params.id],
  queryFn: () => getUser(params.id),
  gcTime: 0,
})

const { data: roles } = useQuery({
  queryKey: ['roles'],
  queryFn: getRoles,
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: EditUserProps) => editUser(data, params.id),

  onSuccess: () => {
    router.push('/users')

    toast({
      title: 'User created',
    })
  },

  onError: (error: AxiosError) => {
    const errorResponse = error.response?.data as { message: string }

    toast({
      title: 'Error',
      description: errorResponse.message || 'Something went wrong',
      variant: 'destructive',
    })
  },
})

const formSchema = toTypedSchema(z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string().min(1),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
}))

const form = useForm({
  validationSchema: formSchema,
})

watch([isFetching, isSuccess], () => {
  form.setValues({
    email: user.value?.data.data.email,
    name: user.value?.data.data.name,
    role: user.value?.data.data.role,
  })
})

const onSubmit = form.handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <div class="">
    <Card class="w-full">
      <form @submit="onSubmit">
        <CardHeader>
          <CardTitle>Edit user</CardTitle>
        </CardHeader>

        <CardContent class="w-full flex flex-col justify-center gap-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="role">
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="role in roles?.data.data" :key="role.id" :value="role.name">
                      {{ role.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="***" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password_confirmation">
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="***" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>

        <CardFooter class="w-full">
          <Button size="lg" :is-loading="isPending" type="submit">
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
