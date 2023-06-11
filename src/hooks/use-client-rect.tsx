import { useState, useCallback } from "react"

type ClientRect = Omit<DOMRect, "toJSON">

/**
 * 测量 ReactDom 的自定义 Hook。
 * 定义如下   const [rect, ref] = useClientRect()；
 * 使用时给节点的 ref 绑定定义的 ref : <div ref={ref}>；
 * 直接使用 rect 即可获取元素的部分位置和尺寸信息。
 */
export const useClientRect = (): [
  ClientRect,
  React.RefCallback<HTMLElement>
] => {
  const [rect, setRect] = useState<ClientRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  })
  const ref = useCallback((node: HTMLElement): void => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])
  return [rect, ref]
}
