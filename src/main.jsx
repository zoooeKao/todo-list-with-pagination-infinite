// @ts-check
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { ProfileContextProvider, LoadDataContextProvider, TabContextProvider } from './model/app/provider';
import './styles/reset.scss';
import './styles/base.scss';
import './styles/variable.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProfileContextProvider>
      <LoadDataContextProvider>
        <TabContextProvider>
          <App />
        </TabContextProvider>
      </LoadDataContextProvider>
    </ProfileContextProvider>
  </React.StrictMode>,
);
