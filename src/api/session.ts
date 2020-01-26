import { ApiClient } from './'
import { ValidationError, UnexpectedError } from './errors'

export class SessionApi extends ApiClient {
  /**
   * @override
   */
  get uri() {
    return '/session'
  }

  login(email: string, password: string) {
    try {
      return this.$call('post', undefined, undefined, { email, password })
    } catch (error) {
      switch (error?.response?.status) {
        case 400:
          throw new ValidationError(error)
        default:
          throw new UnexpectedError(error)
      }
    }
  }

  logout() {
    try {
      return this.$call('delete')
    } catch (error) {
      throw new UnexpectedError(error)
    }
  }
}
