import React, { MutableRefObject, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import useSize from './hooks/useSize'
import useDrag from './hooks/useDrag'
import useRequest from './ahooks/src/package/useRequest'

function App() {
  const appRef: MutableRefObject<any> = useRef(null)
  const { width, height } = useSize(appRef)
  const dragRef = useRef(null)

  console.log(width, height)
  const dragstart = (e: React.DragEvent) => {
    console.log(e)
  }
  const { isDraging } = useDrag(dragRef, { dragstart })
  const handleClick = () => {}
  useRequest(
    () =>
      new Promise((resolve) => {
        resolve('')
      })
  )
  return (
    <div className="App" ref={appRef} onClick={handleClick}>
      <header className="App-header">
        <img src={logo} id="test" className="App-logo" alt="logo" />
        <div>
          ________________________
          <h1>useSize</h1>
          <p>{`App宽度和高度=>Width:${width},Hight:${height}`}</p>
        </div>
        <div>
          _________________________
          <h1>useDrag</h1>
          <div className="w-20 h-20 text-black bg-white" ref={dragRef}>
            拖拽物体
          </div>
          <div>拖拽状态：{isDraging ? '正在拖拽' : '停止拖拽'}</div>
        </div>
      </header>
    </div>
  )
}

export default App
