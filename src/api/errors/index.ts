import { AxiosError } from 'axios'

export class AppError extends Error {
  error: any // may be <Error>

  constructor(error?: any, message = 'APP_ERROR') {
    super(message)
    this.error = error
  }
}

export class ValidationError extends AppError {}

export class UnexpectedError extends AppError {}

export class NoResourceError extends AppError {}

export class NoPermissionError extends AppError {}

export class NoSessionError extends AppError {}
