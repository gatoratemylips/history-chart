import React from 'react';
import ChartHelper from './components/Chart';
import Menu from './components/Menu';

export default function App() {

  return (
    <div className='app'>
      <Menu />
      
      <ChartHelper />
    </div>

  );
}