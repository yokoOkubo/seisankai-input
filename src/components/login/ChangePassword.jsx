import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';
import { updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.scss';
import '../../App.scss';
import Sidebar from '../side/Sidebar';
import { Button } from '@mui/material';

const ChangePassword = () => {
  //ログインしていないならログイン画面へ
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser == null) {
      navigate('/');
    }
  }, [navigate]);

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const user = auth.currentUser;

 
  const changePassword = () => {
    if (pass1 !== pass2) {
      setErrorMsg("入力された2つのパスワードが一致しません");
      return;
    } 
    updatePassword(user, pass1)
      .then(() => {
        setErrorMsg('パスワードを変更しました');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ':' + errorMessage);
        setErrorMsg(errorMessage);
      });
  }
  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="changePassword">
          <h1>パスワードの変更</h1>
          <div>
            新しいパスワード
            <br />
            <input
              className="pass"
              type="text"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
            />
          </div>
          <div>
            もう1度新しいパスワードを入力してください
            <br />
            <input
              className="pass"
              type="password"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={changePassword} className="btn">
            パスワード変更
          </Button>
          <div className="error">{errorMsg}</div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword