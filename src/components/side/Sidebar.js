import React from 'react'
import './Sidebar.scss'
// import Login from './Login.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const Sidebar = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

  return (
    <div className="sidebar">
      {auth.currentUser != null ? (
        <div>
          
          <div className="button">
            {auth.currentUser.email}
          </div>
          <div className="button">
            <Button variant="contained" onClick={logOut} className="btn">
              ログアウト
            </Button>
          </div>
          <br />
          <ul>
            <li>
              <NavLink to="/gyoujiList">行事　一覧</NavLink>
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
            <br/>
            <li>
              <NavLink to="/changePassword">パスワードの変更</NavLink>
            </li>
          </ul>
        </div>
      ) : (
        '現在ログアウト中です'
      )}
    </div>
  );
}

export default Sidebar