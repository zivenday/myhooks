import { MutableRefObject } from 'react'

export type VoidFunc = (params?: any) => void

export type DOMREF = HTMLBodyElement | HTMLElement | MutableRefObject<any>
