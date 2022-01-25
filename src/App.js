import React from 'react';
import SwProvider from './context/SwProvider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <SwProvider>
      <span>Hello, App!</span>
      <Table />
    </SwProvider>
  );
}

export default App;
