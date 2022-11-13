import './App.css'
import {Route , Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Socketpage from './pages/Socketpage';
import IndividualChat from './pages/IndividualChat';
import {io} from 'socket.io-client';

function App() {
  let socket = io('http://localhost:8080', { transports: ["websocket"] }); //! 소켓서버 접속
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/socket' element={<Socketpage socket={socket}/>}/>
        <Route path='/individualChat/:socketId' element={<IndividualChat socket={socket}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
