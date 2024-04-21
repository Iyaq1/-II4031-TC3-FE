import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MainPage from "./page/MainPage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
)
