<script setup lang="ts">
import { Field as FormField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { type CreateRequestProps, createRequest } from '~/api/requests/create-request'
import { getCustomers } from '~/api/customers/get-customers'
import { getCategories } from '~/api/categories/get-categories'
import { getStatuses } from '~/api/statuses/get-statuses'
import { useToast } from '~/components/ui/toast'

const router = useRouter()
const { toast } = useToast()

const { data: customers } = useQuery({
  queryKey: ['customers'],
  queryFn: getCustomers,
})

const { data: categories } = useQuery({
  queryKey: ['categories'],
  queryFn: getCategories,
})

const { data: statuses } = useQuery({
  queryKey: ['statuses'],
  queryFn: getStatuses,
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: CreateRequestProps) => createRequest(data),

  onSuccess: () => {
    router.push('/requests')

    toast({
      title: 'Request created',
    })
  },
})

const formSchema = toTypedSchema(z.object({
  content: z.string().min(1),
  customer_id: z.string(),
  category_id: z.string(),
  status_id: z.string(),
}))

const form = useForm({
  validationSchema: formSchema,
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
          <CardTitle>Create new request</CardTitle>
        </CardHeader>

        <CardContent class="w-full flex flex-col justify-center gap-4">
          <FormField v-slot="{ componentField }" name="content">
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="customer_id">
            <FormItem>
              <FormLabel>Customers</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="customer in customers?.data.data" :key="customer.id" :value="customer.id.toString()">
                      {{ customer.firstname }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="category_id">
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="category in categories?.data.data" :key="category.id" :value="category.id.toString()">
                      {{ category.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="status_id">
            <FormItem>
              <FormLabel>Statuses</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="status in statuses?.data.data" :key="status.id" :value="status.id.toString()">
                      {{ status.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
