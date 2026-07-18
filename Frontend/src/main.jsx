import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistor = persistStore(store);

(function normalizePathname() {
  try {
    const { pathname } = window.location;
    if (pathname && pathname.startsWith('/http')) {
      const match = pathname.match(/(https?:\/\/[^/]+)(\/.*)?$/);
      const newPath = match ? (match[2] || '/') : '/';
      window.history.replaceState(null, '', newPath);
    }
  } catch (e) {
    console.warn('Pathname normalization failed', e);
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
