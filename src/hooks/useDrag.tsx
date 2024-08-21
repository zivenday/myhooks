import { useCallback, useLayoutEffect, useState } from 'react'
import { DOMREF, VoidFunc } from './type'
import { getTarget, noop } from './utils'

interface Dragable {
  isDraging: boolean
}

interface DragOption {
  dragstart?: VoidFunc
  dragend?: VoidFunc
}

function useDrag(dom: DOMREF, options?: DragOption): Dragable {
  const [isDraging, setIsDraging] = useState(false)

  const dragstartHandle = useCallback((e: React.DragEvent) => {
    setIsDraging(true)
    options?.dragstart?.(e)
  }, [])

  const dragendHandle = useCallback((e: React.DragEvent) => {
    setIsDraging(false)
    options?.dragend?.(e)
  }, [])

  useLayoutEffect(() => {
    const el = getTarget(dom)
    if (!el) return console.error('no el')
    el.draggable = true
    el.addEventListener('dragstart', dragstartHandle)
    el.addEventListener('dragend', dragendHandle)
    return () => {
      el.removeEventListener('dragstart', dragstartHandle)
      el.removeEventListener('dragend', dragendHandle)
    }
  }, [])
  return { isDraging }
}

export default useDrag
