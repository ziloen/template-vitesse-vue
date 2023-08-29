import { Fragment, VNode, cloneVNode, h, isVNode } from 'vue'
import { useI18n } from 'vue-i18n'


export function useT() {
  const { t } = useI18n()

  function tFunc(key: string): string
  function tFunc(key: string,
    data: Record<string, ((text: string) => VNode) | VNode | JSX.Element>
  ): VNode
  function tFunc(key: string, data?: Record<string, ((text: string) => VNode) | VNode>) {
    if (!data) return t(key)

    const fnData = new Map<string, (text: string) => VNode>()
    const vnodeData = new Map<string, VNode>()
    const originData = {} as Record<string, string>

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'function') {
        fnData.set(key, value)
      } else if (isVNode(value)) {
        vnodeData.set(key, value)
      } else {
        originData[key] = value
      }
    }

    if (fnData.size === 0 && vnodeData.size === 0) return t(key, originData)

    const text = t(key, originData)

    const regex = /<(\w+)>(.*?)<\/\1>|{{(\w+)}}/g
    let match
    const result: (VNode | string)[] = []
    let lastIndex = 0

    while ((match = regex.exec(text)) !== null) {
      const [full, tag, content, variable] = match
      const before = text.slice(lastIndex, match.index)
      lastIndex = regex.lastIndex

      if (before) result.push(before)

      if (tag) {
        const fn = fnData.get(tag)
        if (fn) {
          result.push(fn(content!))
        } else {
          const vnode = vnodeData.get(tag)

          if (vnode) {
            result.push(cloneVNode(vnode, { innerHTML: content }))
          } else {
            result.push(content!)
          }
        }
      } else if (variable) {
        const vnode = vnodeData.get(variable)

        if (vnode) {
          result.push(vnode)
        } else {
          result.push(full)
        }
      }
    }

    return h(Fragment, null, result)
  }

  return {
    t: tFunc
  }
}