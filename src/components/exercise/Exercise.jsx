import React, { useEffect } from 'react'
import "./Exercise.scss"
import { useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

const Exercise = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(()=>{
    const ref = collection(db,"exercises");
    const ex = query(ref, orderBy("created"));
    onSnapshot(ex,(snapshot)=>{ //snapshotが取得したコレクション
      setExercises(snapshot.docs.map((doc)=>{
        return {
          id: doc.id,
          ...doc.data(),
        };
      }));

    });
  },[]);
  return (
    <div className="exercise">
      ラジオ体操
      {exercises.map((exercise)=>{
        return (
          <div className='one'>
            <h2>{exercise.place}</h2>
            <div>{exercise.date}</div>
            <div>{exercise.contents}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Exercise