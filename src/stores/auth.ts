import { defineStore } from 'pinia'
import type { User } from '~/api/types'
import { logout } from '~/api/auth/logout'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | User>(null)
  const router = useRouter()

  function setUser(userData: User) {
    user.value = userData
  }

  async function removeUser() {
    await logout()

    router.replace('/login')
    user.value = null
  }

  return {
    user,
    setUser,
    removeUser,
  }
})
