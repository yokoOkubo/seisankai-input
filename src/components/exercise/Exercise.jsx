import React, { useEffect } from 'react'
import "./Exercise.scss"
import '../../App.scss';
import { useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../side/Sidebar';

const Exercise = () => {
  //ログインしていないならログイン画面へ
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser == null) {
      navigate('/');
    }
  }, [navigate]);

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const ref = collection(db, 'exercises');
    const ex = query(ref, orderBy('created'));
    onSnapshot(ex, (snapshot) => {
      //snapshotが取得したコレクション
      setExercises(
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
        <div className="exercise">
          ラジオ体操
          {exercises.map((exercise) => {
            return (
              <div className="one">
                <h2>{exercise.place}</h2>
                <div>{exercise.date}</div>
                <div>{exercise.contents}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Exercise