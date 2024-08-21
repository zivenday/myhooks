import { MutableRefObject, useLayoutEffect, useRef } from 'react'
import { useState } from 'react'
import { DOMREF } from './type'
import { getTarget } from './utils'

type Size = {
  width: number
  height: number
}

export default function useSize(dom: DOMREF) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })
  const sizeRef = useRef(size)

  const updateSize = (size: Size): void => {
    const { width, height } = size
    if (sizeRef.current.width !== width || sizeRef.current.height !== height) {
      sizeRef.current = size
      setSize(size)
    }
  }

  const createObserver = (): ResizeObserver => {
    return new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        updateSize({ width, height })
      }
    })
  }

  useLayoutEffect(() => {
    const el = getTarget(dom)
    if (!el) return
    const resizeObserver = createObserver()
    resizeObserver.observe(el)
    return () => {
      resizeObserver.disconnect()
    }
  })
  return size
}
