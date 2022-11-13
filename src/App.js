import './App.css'
import {Route , Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Socketpage from './pages/Socketpage';
function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/socket' element={<Socketpage/>}/>
      </Routes>
    </div>
  );
}

export default App;
