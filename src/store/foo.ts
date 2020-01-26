import * as lib from '../lib/store'

class State {
  count = 0
}

class Actions extends lib.Actions<State> {
  increment() {
    this.$state.count++
  }

  add(value: number) {
    this.$state.count += value
  }
}

export default new lib.Module({
  state: State,
  actions: Actions,
})
