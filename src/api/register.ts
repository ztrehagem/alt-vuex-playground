import ApiClient from '../plugins/api-client'
import ValidationError from '../app/errors/validation-error'
import UnexpectedError from '../app/errors/unexpected-error'

export default class extends ApiClient {
  /**
   * @override
   */
  get uri() {
    return '/users'
  }

  execute(email: string, password: string) {
    try {
      return this.$request('post', undefined, undefined, { email, password })
    } catch (error) {
      switch (error?.response?.status) {
        case 400:
          throw new ValidationError(error)
        default:
          throw new UnexpectedError(error)
      }
    }
  }
}
