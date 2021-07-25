import React from "react"

interface IRect {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}

/**
 * 测量 ReactDom 的自定义 Hook。
 * 定义如下   const [rect, ref] = useClientRect()；
 * 使用时给节点的 ref 绑定定义的 ref : <div ref={ref}>；
 * 直接使用 rect 即可获取元素的部分位置和尺寸信息。
 */
export const useClientRect = (): [IRect, React.RefObject<HTMLElement>] => {
  const [rect, setRect] = React.useState<IRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  })
  const ref = React.useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])
  return [rect, ref]
}

export function useSearchParams<T>(search: string): T {
  const _search = new URLSearchParams(search)
  const result: any = {}
  _search.forEach((val, key) => {
    result[key] = val
  })

  return result
}
