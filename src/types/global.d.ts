// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck



// global variables
declare global {
  const IS_PROD: boolean
  const IS_DEV: boolean
  const IS_BUILD: boolean
}



import type { } from '@wai-ri/core'
// global types
declare global {
  export type {
    AsyncFn,
    Fn,
    LiteralUnion
  } from '@wai-ri/core'
}

export { }

