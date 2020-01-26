import * as lib from '../lib/store'
import { SessionApi } from '../api/session'

class State {
  isLoggedIn = false
}

class Actions extends lib.Actions<State> {
  api = new SessionApi()

  async login(email: string, password: string) {
    await this.api.login(email, password)
    this.$state.isLoggedIn = true
  }

  async logout() {
    await this.api.logout()
    this.$state.isLoggedIn = false
  }
}

export default new lib.Module({
  state: State,
  actions: Actions,
})
