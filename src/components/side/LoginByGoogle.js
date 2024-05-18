import { Button } from '@mui/material';
import React from 'react';
import "./Login.scss";
import { auth, provider } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// ログイン状態を管理するために、npm i react-firebase-hooksでインストール必要
import { useAuthState } from 'react-firebase-hooks/auth';

const LoginByGoogle = () => {
  const [user] = useAuthState(auth);  //ログイン状態
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    hd: 'yoko.puyo@gmail.com', // ここに特定のドメインを指定
  });
  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user); 
      console.log(user.email); 
      // ...
    });
  }
  const signOut = () => {
    auth.signOut();
  }
  
  return (
    <div className="login">
      {user ? (
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
  )
}
export default LoginByGoogle;
