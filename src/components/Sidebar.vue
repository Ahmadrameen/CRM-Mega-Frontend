<script setup>
import { GitPullRequestArrow, LayoutDashboard, LogOut, Users } from 'lucide-vue-next'
import { logout } from '~/api/auth/logout'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const links = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    to: '/',
  },
  {
    title: 'Requests',
    icon: GitPullRequestArrow,
    to: '/requests',
  },
  {
    title: 'Users',
    icon: Users,
    to: '/users',
  },
]
</script>

<template>
  <aside class="border sticky top-0 left-0 min-w-64 max-w-sm py-4 px-6 bg-card ">
    <div class="px-5 mt-4 mb-8 flex items-center justify-between">
      <Avatar shape="square">
        <AvatarFallback>
          <span class="text-lg">{{ authStore.user?.name.charAt(0) }}</span>
        </AvatarFallback>
      </Avatar>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="ghost" @click="authStore.removeUser()">
              <LogOut class="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Log out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    <nav>
      <ul class="flex flex-col gap-2">
        <li v-for="link in links" :key="link.title">
          <RouterLink :to="link.to" class="flex items-center gap-3 px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors [&.router-link-active]:bg-primary [&.router-link-active]:text-white">
            <component :is="link.icon" />
            <span>{{ link.title }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
