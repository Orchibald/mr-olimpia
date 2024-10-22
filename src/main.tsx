import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { Root } from './Root'
import { Provider } from 'react-redux'
import store from './store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>,
)
