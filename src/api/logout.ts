import ApiClient from '../plugins/api-client'
import UnexpectedError from '../app/errors/unexpected-error'

export default class extends ApiClient {
  /**
   * @override
   */
  get uri() {
    return '/session'
  }

  execute() {
    try {
      return this.$request('delete')
    } catch (error) {
      throw new UnexpectedError(error)
    }
  }
}
