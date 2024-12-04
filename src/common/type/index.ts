
export interface BaseResponseType<T> {
    success: boolean,
    data: any
    code: number
    message: string
}