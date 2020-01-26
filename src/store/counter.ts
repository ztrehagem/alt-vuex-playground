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

export default class extends lib.Module<State, Actions> {
  constructor() {
    super({ state: State, actions: Actions })
  }
}
