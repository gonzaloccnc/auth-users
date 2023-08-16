import { NextFunction, Request, Response } from 'express'

export interface Pagination<T> {
  data: T[] | null
  status: number
  page: number
  pageSize: number
  hints: number
  pages: number,
  prev: string | null
  next: string | null
  error: string | null
}

export interface Data<T> {
  data: T | null
  status: number
  error: string | null
}

export interface IRequestPayload<T> extends Request {
  body: T
}

export interface Handler<R, B> {
  (
    req: IRequestPayload<R>,
    res: Response<B, Record<string, any>>,
    next: NextFunction
  ): Promise<void | Response<B>> | void | Response<B>
}
