import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './ExerciseList.scss';

const ExerciseList = () => {
  const [exercises,setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const ref = collection(db,"exercises");
    const lists = query(ref, orderBy("created"));
    onSnapshot(lists,(snapshot)=>{
        setExercises(snapshot.docs.map((doc)=>{
          return {
            id: doc.id,
            ...doc.data(),
          };
        }));
    }); 
  },[]);

  
  //---各ドキュメントの削除ボタンを押した時の処理
  const deleteExercise = async (id) => {
    await deleteDoc(doc(db, 'exercises', id));
  }
  
  //---各ドキュメントの変更ボタンを押した時の処理
  const updateExercise = (id) => {
    navigate("/exerciseUpdate/" + id);
  };

  return (
    <div className="exerciseList">
      <table className="exerciseTable">
        <caption><h2>ラジオ体操情報一覧</h2></caption>
        <thead>
          <tr>
            <th>場所</th>
            <th>日程</th>
            <th>内容</th>
            <th>削除</th>
            <th>変更</th>
          </tr>
        </thead>

        <tbody>
          {exercises.map((exercise) =>(
            <tr key={exercise.id}>
              <td>{exercise.place}</td>
              <td>{exercise.date}</td>
              <td>{exercise.contents.substr(0,20)+"..."}</td>
              <td>
                <Button variant="contained" onClick={()=>deleteExercise(exercise.id)}>削除</Button>
              </td>
              <td>
                <Button variant="contained" onClick={()=>updateExercise(exercise.id)}>変更</Button>
              </td>
            </tr>
          ) )}
        </tbody>
      </table>  
    </div>
  )
}

export default ExerciseList