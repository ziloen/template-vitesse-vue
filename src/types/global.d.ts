/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-var */
// @ts-nocheck
/**
 * @deprecated
 * use `import.meta.env.PROD` instead
 * [Env Variables](https://vitejs.dev/guide/env-and-mode.html#env-variables)
 */
declare const IS_PROD: boolean
/**
 * @deprecated
 * use `import.meta.env.DEV` instead
 * [Env Variables](https://vitejs.dev/guide/env-and-mode.html#env-variables)
 */
declare const IS_DEV: boolean
declare const IS_BUILD: boolean
// if you want variable available on globalThis / Window, use `var` instead of `const` or `let`
// if you need import variable, use `import("bar").foo` instead of `import { foo } from "bar"`
declare var __VUE__: boolean | undefined


// Set methods types
// TODO: https://github.com/microsoft/TypeScript/issues/57228
// https://github.com/tc39/proposal-set-methods
// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set#set_composition
interface Set<T> {
  /**
   * [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/difference)
   */
  difference<K>(other: Set<K>): Set<T>
  /**
   * [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection)
   */
  intersection<K>(other: Set<K>): Set<T>
  /**
   * [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/isDisjointFrom)
   */
  isDisjointFrom<K>(other: Set<K>): boolean
  /**
   * [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/isSubsetOf)
   */
  isSubsetOf<K>(other: Set<K>): boolean
  /**
   * [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/isSupersetOf)
   */
  isSupersetOf<K>(other: Set<K>): boolean
  /**
   * [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/symmetricDifference)
   */
  symmetricDifference<K>(other: Set<K>): Set<T>
  /**
   * [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/union)
   */
  union<K>(other: Set<K>): Set<T>
}


interface ArrayConstructor {
  // TODO: remove when lib.d.ts is updated
  // https://github.com/microsoft/TypeScript/issues/50803
  /**
   * Creates an array from an array-like or iterable object.
   * 
   * [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync)
   */
  fromAsync<T>(
    iterableOrArrayLike: AsyncIterable<T> | Iterable<T | Promise<T>> | ArrayLike<T | Promise<T>>,
  ): Promise<T[]>
  fromAsync<T, U>(
    iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
    mapFn: (value: Awaited<T>) => U,
    thisArg?: any,
  ): Promise<Awaited<U>[]>
}

interface ShadowRoot {
  // https://caniuse.com/mdn-api_shadowroot_getselection
  getSelection?: () => (Selection | null)
}