import AxiosMock from 'axios-mock-adapter'
import axios from '../plugins/axios'

const mock = new AxiosMock(axios, { delayResponse: 700 })

mock.onPost('/session').reply(204)
mock.onDelete('/session').reply(204)
