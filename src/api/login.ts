import ApiClient from '../plugins/api-client'
import ValidationError, { ValidationErrorBuilder } from '../app/errors/validation-error'
import UnexpectedError from '../app/errors/unexpected-error'

export default class extends ApiClient {
  /**
   * @override
   */
  get uri() {
    return '/session'
  }

  login(email: string, password: string) {
    const builder = new ValidationErrorBuilder()
    builder.try('email', () => !email, 'REQUIRED')
    builder.try('email', () => !email.match(/^[^@]+@[^[@]$/), 'INVALID_FORMAT')
    builder.try('password', () => !password, 'REQUIRED')
    const error = builder.toError()

    if (error) throw error

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
