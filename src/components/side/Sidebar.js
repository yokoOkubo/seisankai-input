import React from 'react'
import './Sidebar.scss'
import Login from './Login.js';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Login />
      <ul>
        <li>
          <NavLink to="/gyouji">参考　行事のページ</NavLink>
        </li>
        <li>
          <NavLink to="/">町会行事一覧</NavLink>
        </li>
        <li>
          <NavLink to="/gyoujiInput">行事データ新規作成</NavLink>
        </li>
        <li>
          <NavLink to="/joinList">仲間募集一覧</NavLink>
        </li>
        <li>
          <NavLink to="/joinInput">仲間募集新規作成</NavLink>
        </li>
        <li>
          <NavLink to="/exercise">ラジオ体操</NavLink>
        </li>
        <li>
          <NavLink to="/newsPaperInput">西三会だより新規作成</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar