import { useState } from 'react';
import { auth, provider } from '../../firebase'; // Firebaseの認証オブジェクトをインポートする
import { Button } from '@mui/material';
import React from 'react';
import './Login.scss';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Firebaseの認証メソッドを使用して、ユーザーが入力したメールアドレスとパスワードでログインを試行する
  //     await auth.signInWithEmailAndPassword(mail, pass);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  const signIn = async () => {
    const m = window.prompt('登録されているE-mailを入力してください', '');
    const p = window.prompt('パスワードを入力してください', '');
    


  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log("OK");
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log('err');
  });
  }
  const signOut = () =>{
    setMail("");
    setPass("");
  }
  return (
    <div className="login">
      {mail ? (
        <>
          <UserInfo />
          <Button variant="contained" onClick={signOut} className="btn">
            サインアウト
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={signIn} className="btn">
          サインイン
        </Button>
      )}
    </div>
  );
};

function UserInfo() {
  return (
    <div className="userInfo">
      <img src={auth.currentUser.photoURL} alt="" />
      <p>{auth.currentUser.displayName}</p>
    </div>
  );
}
export default Login;
