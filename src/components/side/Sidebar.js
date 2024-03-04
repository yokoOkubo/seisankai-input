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
          <NavLink to="/">行事　一覧</NavLink>
        </li>
        <li>
          <NavLink to="/gyoujiInput">行事　新規作成</NavLink>
        </li>
        <li>
          <NavLink to="/gyouji">行事（参考）</NavLink>
        </li>
        <li>
          <NavLink to="/joinList">仲間募集　一覧</NavLink>
        </li>
        <li>
          <NavLink to="/joinInput">仲間募集　新規作成</NavLink>
        </li>
        <li>
          <NavLink to="/join">仲間募集（参考）</NavLink>
        </li>
        <li>
          <NavLink to="/exerciseList">ラジオ体操　一覧</NavLink>
        </li>
        <li>
          <NavLink to="/exerciseInput">ラジオ体操　新規作成</NavLink>
        </li>
        <li>
          <NavLink to="/exercise">ラジオ体操（参考）</NavLink>
        </li>
        <li>
          <NavLink to="/newspaperList">西三会だより　一覧</NavLink>
        </li>
        <li>
          <NavLink to="/newspaperInput">西三会だより　新規作成</NavLink>
        </li>
        <li>
          <NavLink to="/newspaper">西三会だより（参考）</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar