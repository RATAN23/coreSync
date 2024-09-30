import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import { Provider } from 'react-redux'
import { store } from './redux/store.js';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Hero from './components/hero.jsx';

const router = createBrowserRouter([
  {
    element: <Hero/>,
    path : "/sign"
  },
  {
    element : <App/>,
    path : "/"
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <NextUIProvider>
       <RouterProvider router = {router}/>
      </NextUIProvider>
      </Provider>
  </StrictMode>,
)
