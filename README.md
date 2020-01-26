## Directories

```
src
├── index.pug
├── app.ts              // instantiate Vue
├── App.vue             // root view
│
├── lib                 // libraries to be external modules
│   ├── api-client.ts
│   └── store.ts
│
├── plugins             // application specific plugins for extending libraries
│   ├── api-client.ts
│   └── axios.ts
│
├── api                 // api classes
│   ├── login.ts
│   ├── logout.ts
│   ├── register.ts
│   :
│
├── store
│   ├── index.ts        // global store instances
│   ├── counter.ts      // store module class
│   ├── session.ts      // store module class
:   :
```

## Stores
- not dependent on Vuex
- no mutation, integrated with actions
- inspired by vuex-smart-module
