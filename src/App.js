import React from 'react'; 
import Covid  from './features/covid/Covid';
import Loading from './components/Loading';

function App() { 
  return (
    <div >
      <Loading /> 
      <Covid/>
    </div>
  );
}

export default App;
