<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="flex relative">
    <Sheet>
      <SheetTrigger v-if="authStore.user" class="lg:hidden absolute top-5 left-6">
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="w-[300px] px-0">
        <Sidebar class="bg-white border-none" />
      </SheetContent>
    </Sheet>

    <Sidebar v-if="authStore.user" class="hidden lg:block" />
    <main class="container min-h-screen mt-20 lg:mt-5 lg:px-10">
      <RouterView />
    </main>
  </div>
  <Toaster />
</template>
