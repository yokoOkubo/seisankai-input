import { useState } from 'react';
import { auth } from '../../firebase'; // Firebaseの認証オブジェクトをインポートする
import { Button } from '@mui/material';
import React from 'react';
import './Login.scss';
import '../../App.scss';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../side/Sidebar';

const Login = () => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const signIn = async () => {
    signInWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('user=' + user + ':' + user.email);
        navigate("/gyoujiList");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ':' + errorMessage);
        setErrorMsg("IDまたはパスワードが間違っています");
      });
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="login">
          <h1>町会情報入力システム</h1>
          <div>
            ID(メール)
            <br />
            <input
              className="mail"
              type="text"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div>
            パスワード
            <br />
            <input
              className="mail"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={signIn} className="btn">
            ログイン
          </Button>
          <div className="error">
            {errorMsg}
          </div>
          <div className="explain">
            <ul>
              <li>
                このサイトを閲覧するにはIDが必要です。
                IDをお持ちでない方は、電話にて町会への申し込みをお願いします。
              </li>
              <li>
                パスワードをお忘れの方は再発行しますので電話にて町会へご連絡ください。
              </li>
            </ul>
            <br />
            TEL:xxx-xxxx-xxxx
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
