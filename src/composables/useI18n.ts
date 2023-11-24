import { useTranslation } from 'i18next-vue'
import { Fragment, VNode, cloneVNode, createVNode, h, isVNode } from 'vue'


export function useI18n() {
  const { t, i18next } = useTranslation()

  function tFunc(key: string): string
  function tFunc(key: string,
    data: Record<string, ((text: string) => VNode) | VNode | JSX.Element | string>
  ): VNode
  function tFunc(key: string, data?: Record<string, ((text: string) => VNode) | VNode | JSX.Element | string>) {
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
        const render = fnData.get(tag) ?? vnodeData.get(tag)
        result.push(getRendered(render, content!))
      } else if (variable) {
        const vnode = vnodeData.get(variable)
        result.push(vnode ? cloneVNode(vnode) : full)
      }
    }

    const after = text.slice(lastIndex)
    if (after) result.push(after)

    return h(Fragment, result)
  }

  return {
    t: tFunc,
    i18next
  }
}


/**
 * Get rendered content
 */
function getRendered(render: ((content: string) => VNode) | VNode | undefined, content: string) {
  if (!render) return content
  if (typeof render === 'function') return render(content)
  return createVNode(render, null, content)
}