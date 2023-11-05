import './App.scss';
import { useState } from 'react';
import Join from './components/join/Join';
import GyoujiList from './components/gyouji/GyoujiList';
import Exercise from './components/exercise/Exercise';
import NewspaperInput from './components/newspaper/NewspaperInput';
import GyoujiInput from './components/gyouji/GyoujiInput';
import Sidebar from './components/side/Sidebar';
import { SidebarData } from './components/side/SidebarData';

function App() {
  const [page, setPage] = useState(0);

  console.log("page="+ page);
  return (
    <div className="App">
      <Sidebar setPage={setPage}/>

      {SidebarData.map((value)=> {
        console.log("page="+page + "link="+value.link);
        if (page === value.pageID) {
          console.log("===");
          return <div className='main'>{value.link}</div>;
        }
      })}
    </div>
  
  );
}

export default App;
