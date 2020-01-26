import * as lib from '../lib/store'
import LoginApi from '../api/login'
import LogoutApi from '../api/logout'

class State {
  isLoggedIn = false
}

class Actions extends lib.Actions<State> {
  async login(email: string, password: string) {
    const api = new LoginApi()
    await api.execute({ email, password })
    this.$state.isLoggedIn = true
  }

  async logout() {
    const api = new LogoutApi()
    await api.execute()
    this.$state.isLoggedIn = false
  }
}

export default class extends lib.Module<State, Actions> {
  constructor() {
    super({ state: State, actions: Actions })
  }
}
