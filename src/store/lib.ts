import Vue from 'vue'

export interface Class<T> {
  new (...args: any[]): T
}

export class Actions<S> {
  $state: S

  constructor($state: S) {
    this.$state = $state
  }
}

interface ModuleParts<S, A extends Actions<S>> {
  state: Class<S>
  actions: Class<A>
}

export class Module<S, A extends Actions<S>> {
  public state: Readonly<S>
  public actions: A

  constructor({ state, actions }: ModuleParts<S, A>) {
    const vState = Vue.observable<S>(new state())
    this.state = readonly(vState)
    this.actions = new actions(vState)
  }
}

function readonly<T>(source: T): Readonly<T> {
  const keys = Object.keys(source) as (keyof T & string)[]

  const props = keys.reduce<any>((acc, key) => ({
    ...acc,
    [key]: {
      get() {
        return source[key]
      },
    },
  }), {})

  return Object.defineProperties({}, props) as Readonly<T>
}
