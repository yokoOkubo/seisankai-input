import React from 'react'
import './Sidebar.scss'
import {SidebarData} from './SidebarData.js'
import Login from './Login.js';

const Sidebar = (props) => {
  const {setPage} = props;
  return (
    <div className="sidebar">
      <Login />
      <ul className="sidebarlist">
        {SidebarData.map((value, key) => {
          if (value.display === true) {
            return (
              <li key={key} 
                  className='row' 
                  onClick={()=>{
                    setPage(value.pageID);
                    console.log(value.pageID);
                  }}
              >
                <div className="icon">{value.icon}</div>
                <div className="title">{value.title}</div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Sidebar