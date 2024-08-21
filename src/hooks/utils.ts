import { DOMREF } from './type'
import { MutableRefObject } from 'react'

function noop(params?: any) {}

function isMutableRefObject(dom: DOMREF): boolean {
  return 'current' in dom
}

function getTarget(dom: DOMREF) {
  return isMutableRefObject(dom) ? (dom as MutableRefObject<any>).current : dom
}

export { noop, isMutableRefObject, getTarget }
