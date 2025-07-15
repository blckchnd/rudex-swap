import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SwitchThemeProvider } from './components/utils/provider/SwitchThemeProvider.jsx';
import { SwitchLanguageProvider } from './components/utils/provider/SwitchLanguageProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { InfoProvider } from '@components/utils/provider/InfoProvider.jsx';
import App from '@components/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SwitchThemeProvider>
        <SwitchLanguageProvider>
          <InfoProvider>
            <App />
          </InfoProvider>
        </SwitchLanguageProvider>
      </SwitchThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
