import axios from 'axios'
import { message } from '~/utils'



const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 2_000
})



request.interceptors.response.use(
  value => {
    message.success('Request Success')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value.data
  },
  (error: Error) => {

    // const message = useMessage()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    message.error(error.message || 'Request Error')
    throw error
  }
)

export { request }


export type PageParams = {
  // 
}