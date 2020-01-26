import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios'

type HttpMethod = 'get' | 'put' | 'post' | 'delete'

export function buildUri(str: string, params: Record<string, any> = {}) {
  return str.replace(/\/\{([^\/]+?)\}/g, (match: string, key: string) => params[key] ? `/${params[key]}` : '')
}

export abstract class ApiClient<UriParams extends Record<string, any> = never, QueryParams extends Record<string, any> = never> {
  private localAxios?: AxiosInstance
  static staticAxios?: AxiosInstance

  constructor(axios?: AxiosInstance) {
    this.localAxios = axios
  }

  protected abstract get uri(): string

  protected get axios() {
    return this.localAxios || ApiClient.staticAxios || axiosStatic
  }

  protected get localConfig() {
    return {}
  }

  protected request(method: HttpMethod, params?: UriParams, query?: QueryParams, data?: any, config: AxiosRequestConfig = {}) {
    return this.axios.request({
      method,
      url: buildUri(this.uri, params),
      params: query,
      data,
      ...this.localConfig,
      ...config,
    })
  }

  protected async $request(...args: Parameters<ApiClient<UriParams, QueryParams>['request']>) {
    const { data } = await this.request(...args)
    return data
  }
}
