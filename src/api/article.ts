import { ApiClient } from './'
import { ValidationError, NoSessionError, NoPermissionError, NoResourceError, UnexpectedError } from './errors'

interface UriParams {
  id: number
}

interface Article {
  title: string
  content: string
}

export class ArticleApi extends ApiClient<UriParams> {
  /**
   * @override
   */
  get uri() {
    return '/articles/{id}'
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

  create(article: Article) {
    try {
      return this.$call('post', undefined, undefined, article)
    } catch (error) {
      switch (error?.response?.status) {
        case 400:
          throw new ValidationError(error)
        case 401:
          throw new NoSessionError(error)
        case 403:
          throw new NoPermissionError(error)
        default:
          throw new UnexpectedError(error)
      }
    }
  }

  update(id: number, article: Article) {
    try {
      return this.$call('put', { id }, undefined, article)
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

  delete(id: number) {
    try {
      return this.$call('delete', { id })
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
}
