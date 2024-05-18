import './App.scss';
import Sidebar from './components/side/Sidebar';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      {/* <Sidebar /> */}

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
