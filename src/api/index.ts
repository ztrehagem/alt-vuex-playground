import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { uri } from '../utils/string'

type HttpMethod = 'get' | 'put' | 'post' | 'delete'

export abstract class ApiClient<UriParams extends Record<string, any> = never, QueryParams extends Record<string, any> = never> {
  private axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  protected abstract get uri(): string

  private buildUri(params?: UriParams) {
    return uri(this.uri, params)
  }

  protected call(method: HttpMethod, params?: UriParams, query?: QueryParams, data?: any, config: AxiosRequestConfig = {}) {
    return this.axios.request({
      method,
      url: this.buildUri(params),
      params: query,
      data,
      ...config,
    })
  }

  protected async $call(...args: Parameters<ApiClient<UriParams, QueryParams>['call']>) {
    const { data } = await this.call(...args)
    return data
  }
}
