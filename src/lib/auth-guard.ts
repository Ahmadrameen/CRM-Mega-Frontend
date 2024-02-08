import { storeToRefs } from 'pinia'
import type { Router } from 'vue-router/auto'
import { getAuthUser } from '~/api/auth/get-auth-user'
import { useAuthStore } from '~/stores/auth'

export function authGuard(router: Router) {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)

    if (!user.value) {
      try {
        const userResponse = await getAuthUser()

        if (userResponse.status === 200)
          authStore.setUser(userResponse.data)

        else if (to.path !== '/login')
          return { path: '/login' }
      }
      catch (error) {
        if (to.path !== '/login')
          return { path: '/login' }
      }
    }
  })
}
