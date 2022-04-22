import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
