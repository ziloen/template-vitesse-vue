// @ts-nocheck
import {
  AsyncFn as _AsyncFn,
  EnumString as _EnumString,
  Fn as _Fn
} from "@wai-ri/core"

declare global {
  const IS_PROD: boolean
  const IS_DEV: boolean

  export {
    _AsyncFn as AsyncFn,
    _EnumString as EnumString,
    _Fn as Fn,
    IS_DEV,
    IS_PROD
  }
}

export { }

