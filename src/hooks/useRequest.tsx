import React, { useCallback, useRef, useState } from 'react'

type Arguments = any[] | []

type Callback = (...args: Arguments) => any

type Service<TData> = (...args: Arguments) => Promise<TData>

type Options = { [key: string]: any } | undefined

type Plugin = (instance: any, Options: Options) => any

const useUpdate = () => {
  const [, forceUpdate] = useState({})

  return useCallback(() => forceUpdate({}), [])
}

function useCreation<T>(factory: () => T) {
  const { current } = useRef({ init: false, obj: null as T })

  if (!current.init) {
    current.init = true
    current.obj = factory()
  }
  return current.obj
}

class Fetch<TData> {
  data = undefined as any
  constructor(service: Service<TData>, subscribe: () => void) {
    this.runAsync = async () => {
      console.log('///runAsync')
      const res = await service()
      this.data = res
      subscribe()
    }
  }

  runAsync = function () {
    console.log('null')
  }
}

function debounce(callback: Callback, delay: number) {
  let timeID: NodeJS.Timeout

  return function (...args: Arguments) {
    if (timeID) clearTimeout(timeID)
    timeID = setTimeout(() => {
      callback.call(this, args)
    }, delay)
  }
}

function debouncePlugin(fetchInstance: any, options: Options) {
  console.log('///debouncePlugin')
  const origin = fetchInstance.runAsync.bind(fetchInstance)
  fetchInstance.runAsync = debounce((...args) => {
    origin.call(this, args)
  }, options?.delay || 0)
}

function useRequestImpl<TData>(service: Service<TData>, options?: Options, plugins?: Plugin[]) {
  const update = useUpdate()
  const fetchInstance = useCreation(() => {
    return new Fetch<TData>(service, update)
  })

  plugins?.map((p) => p(fetchInstance, options))

  return { run: fetchInstance.runAsync, data: fetchInstance.data }
}

export default function useRequest<TData>(service: Service<TData>, options?: Options) {
  return useRequestImpl(service, options, [debouncePlugin])
}
