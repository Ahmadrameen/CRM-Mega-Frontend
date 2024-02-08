<script setup lang="ts">
import { Field as FormField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useMutation } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { LoginProps } from '~/api/auth/login'
import { login } from '~/api/auth/login'
import { useToast } from '~/components/ui/toast'

const router = useRouter()
const { toast } = useToast()

const { mutate, isPending } = useMutation({
  mutationFn: (data: LoginProps) => login(data),

  onSuccess: () => {
    router.push('/')
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
  email: z.string().email(),
  password: z.string().min(1),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <div class="min-h-screen grid place-items-center max-w-md mx-auto">
    <Card class="w-full">
      <form @submit="onSubmit">
        <CardHeader>
          <CardTitle>Login with email</CardTitle>
        </CardHeader>

        <CardContent class="flex flex-col justify-center gap-2 w-full">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@admin.com" v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="***" v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>

        <CardFooter class="w-full">
          <Button size="lg" :is-loading="isPending">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
