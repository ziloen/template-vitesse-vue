/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-var */
// @ts-nocheck

declare const IS_PROD: boolean
declare const IS_DEV: boolean
declare const IS_BUILD: boolean
// if you want variable available on globalThis, use `var` instead of `const` or `let`
// if you need import variable, use `import("bar").foo` instead of `import { foo } from "bar"`
declare var __VUE__: boolean | undefined


// import type { } from '@wai-ri/core'
// // global types
// declare global {
//   export type {
//     AsyncFn,
//     Fn,
//     LiteralUnion
//   } from '@wai-ri/core'
// }

// export { }

