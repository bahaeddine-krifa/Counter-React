import { useState } from 'react';
import Counter from './components/Counter'
import Header from './components/Header'
import AutoTimer from './components/AutoTimer';

const App = () => {

  const [showTimer, setShowTimer] = useState(true);
  return (
    <div className ="app - container ">
    <Header
    title ="My React Counter App"
    subtitle =" Mastering Fundamental Hooks : useState & useEffect "
    />
    <Counter />
    <button className='btn btn-reset' onClick={() => setShowTimer(!showTimer)}>
      {showTimer ? 'Masquer le timer' : 'Afficher le timer'}
    </button>
    {showTimer && <AutoTimer />}
    </div >
  )
}

export default App