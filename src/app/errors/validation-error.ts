import AppError from './app-error'

export type ValidationErrorMessages = { [prop: string]: string[] }

export type Validation<Context> = { prop: string, validate: (ctx: Context) => boolean, message: string }

export default class ValidationError extends AppError {
  errors: ValidationErrorMessages = {}
}

export class ValidationErrorBuilder {
  errors: ValidationErrorMessages = {}

  try(prop: string, validate: () => boolean, message: string) {
    const result = validate()
    if (!result) return

    this.errors[prop] = this.errors[prop]?.concat([message]) || [message]
  }

  get hasErrors() {
    return Object.keys(this.errors).length > 0
  }

  toError() {
    if (!this.hasErrors) return

    const error = new ValidationError()
    error.errors = this.errors
    return error
  }
}

export class Validator<Context extends Record<string, any>> {
  context: Context
  collection: Validation<Context>[]

  constructor(context: Context, collection: Validation<Context>[] = []) {
    this.context = context
    this.collection = collection
  }

  add(validation: Validation<Context>) {
    this.collection.push(validation)
  }

  validate() {
    const builder = new ValidationErrorBuilder()
    this.collection.forEach(({ prop, validate, message }) => {
      builder.try(prop, () => validate(this.context), message)
    })
    return builder.toError()
  }
}
