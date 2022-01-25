import React from 'react';
import SwProvider from './context/SwProvider';
import Table from './components/Table';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <SwProvider>
      <Header />
      <Table />
    </SwProvider>
  );
}

export default App;
