import React, { useEffect, useState } from 'react'
import "./Join.scss"
import '../../App.scss';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../side/Sidebar';

const Join = () => {
  //ログインしていないならログイン画面へ
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser == null) {
      navigate('/');
    }
  }, [navigate]);

  const [joins, setJoins] = useState([]);

  useEffect(() => {
    const ref = collection(db, 'join_us');
    const joins = query(ref, orderBy('created'));
    onSnapshot(joins, (snapshot) => {
      setJoins(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);
  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="join">
          仲間募集
          {joins.map((join) => {
            return (
              <div className="one">
                <h2>{join.title}</h2>
                <div>内容：{join.contents}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Join