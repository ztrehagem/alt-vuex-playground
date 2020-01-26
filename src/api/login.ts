import ApiClient from '../plugins/api-client'
import ValidationError, { ValidationErrorBuilder, Validator, Validation } from '../app/errors/validation-error'
import UnexpectedError from '../app/errors/unexpected-error'

interface Params {
  email: string
  password: string
}

const validations: Validation<Params>[] = [
  {
    prop: 'email',
    validate: ({ email }) => !email,
    message: 'REQUIRED',
  },
  {
    prop: 'email',
    validate: ({ email }) => !email.match(/^[^@]+@[^[@]$/),
    message: 'INVALID_FORMAT',
  },
  {
    prop: 'password',
    validate: ({ password }) => !password,
    message: 'REQUIRED',
  },
]

export default class extends ApiClient {
  protected validator = new Validator<Params>(validations)

  /**
   * @override
   */
  get uri() {
    return '/session'
  }

  validate(params: Params) {
    return this.validator.validate(params)
  }

  execute(params: Params) {
    const error = this.validate(params)
    if (error) throw error

    try {
      return this.$request('post', undefined, undefined, {
        email: params.email,
        password: params.password,
      })
    } catch (error) {
      switch (error?.response?.status) {
        case 400:
          throw ValidationError.fromApiResponse(error)
        default:
          throw new UnexpectedError(error)
      }
    }
  }
}
