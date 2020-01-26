import { ApiClient } from './'
import { ValidationError, NoSessionError, NoPermissionError, NoResourceError, UnexpectedError } from './errors'

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

  fetch(id: number) {
    try {
      return this.$call('get', { id })
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
      return this.$call('put', { id }, undefined, user)
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
