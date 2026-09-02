import { create } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"

type State = {
  user: IUser | null
  isAuthenticated: boolean
}

type Actions = {
  setUser: (user: IUser) => void
  clearUser: () => void
  updateUser: (userData: Partial<IUser>) => void
}

type UserStore = State & Actions

const persistConfig: PersistOptions<UserStore> = {
  name: "prospera-admin-user",
}

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      setUser: user => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      updateUser: userData =>
        set(state => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    persistConfig,
  ),
)
