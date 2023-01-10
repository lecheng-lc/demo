import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { registerMicroApps, start } from '../../../dist'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

const appList = [
  {
    name: 'vue',
    activeRule: '/vue',
    container: '#micro-container',
    entry: 'http://localhost:7991',
  },
  {
    name: 'vue2',
    activeRule: '/vue2',
    container: '#micro-container',
    entry: 'http://localhost:7992',
  },
  {
    name: 'vue3',
    activeRule: '/vue3',
    container: '#micro-container',
    entry: 'http://localhost:7993',
  },
]

registerMicroApps(appList)
start()
