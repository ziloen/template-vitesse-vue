// Global JSX namespace
import 'vue/jsx'

// 修正 axios 返回类型
declare module 'axios' {
  interface AxiosRequestConfig {
    requestSchema?: import("zod").ZodTypeAny
    responseSchema?: import("zod").ZodTypeAny
  }
}


export { }

