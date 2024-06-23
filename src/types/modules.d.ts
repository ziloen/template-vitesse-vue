// Global JSX namespace
import 'vue/jsx'

// 修正 axios 返回类型
declare module 'axios' {
  interface AxiosRequestConfig {
    requestZod?: import("zod").ZodTypeAny
    responseZod?: import("zod").ZodTypeAny
  }
}


export { }

