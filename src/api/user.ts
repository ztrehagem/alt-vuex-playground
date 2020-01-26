import ApiClient from '../plugins/api-client'
import { ValidationError, NoSessionError, NoPermissionError, NoResourceError, UnexpectedError } from '../app/errors'

interface UriParams {
  id: number
}

interface User {
  nickname: string
  biography: string
}

export class UserApi extends ApiClient<UriParams> {
  /**
   * @override
   */
  get uri() {
    return '/users/{id}'
  }

  register(email: string, password: string) {
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

  fetch(id: number) {
    try {
      return this.$request('get', { id })
    } catch (error) {
      switch (error?.response?.status) {
        case 401:
          throw new NoSessionError(error)
        case 403:
          throw new NoPermissionError(error)
        case 404:
          throw new NoResourceError(error)
        default:
          throw new UnexpectedError(error)
      }
    }
  }

  update(id: number, user: User) {
    try {
      return this.$request('put', { id }, undefined, user)
    } catch (error) {
      switch (error?.response?.status) {
        case 400:
          throw new ValidationError(error)
        case 401:
          throw new NoSessionError(error)
        case 403:
          throw new NoPermissionError(error)
        case 404:
          throw new NoResourceError(error)
        default:
          throw new UnexpectedError(error)
      }
    }
  }
}
