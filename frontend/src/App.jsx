import './App.css';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './contexts/store.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

const Login = React.lazy(() => import('./components/Login/Login.jsx'));
const FormEndereco = React.lazy(() => import('./components/FormEndereco/FormEndereco.jsx'));

function App() {
  return (
    <Provider store={store}>
      <Router>

        <Routes>
          <Route path="/login" element={
            <Suspense fallback={<div>Carregando Login...</div>}>
              <Login />
            </Suspense>
          } />

          <Route path="/endereco" element={
            <ProtectedRoute>
              <Suspense fallback={<div>Carregando Formulário...</div>}>
                <FormEndereco />
              </Suspense>
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
