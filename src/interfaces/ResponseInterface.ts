/**
 * 自定义响应接口，所有响应必须实现
 */
interface ResponseInterface {
    code: number
    status: 'success' | 'failure' | 'error' | string
    message: string
    data?: object | Array<any>
    error?: any
}

export default ResponseInterface