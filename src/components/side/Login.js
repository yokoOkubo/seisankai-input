import { Button } from '@mui/material';
import React from 'react';
import "./Login.scss";
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
  const [user] = useAuthState(auth);

  const signIn = () => {
    signInWithPopup(auth, provider);
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
export default Login;
