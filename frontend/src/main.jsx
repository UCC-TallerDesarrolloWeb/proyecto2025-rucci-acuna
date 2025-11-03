import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render
<BrowseRouter>
<Routes>
  <Route path="/*" element={<Layout />} />
    <Route index element={<Home />} />
    <Route path="/tienda" element={<Store />} />
    <Route path="/carrito" element={<Cart />} />
</Routes>
</BrowseRouter>
