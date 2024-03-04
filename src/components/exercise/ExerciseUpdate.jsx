import React, { useEffect, useState } from 'react'
import "./ExerciseUpdate.scss"
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ExerciseUpdate = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [contents, setContents] = useState('');
  const [created, setCreated] = useState('');
  
  useEffect(()=>{
    const fetchData = async()=>{
      const docRef = doc(db, "exercises", id);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()) {
        setPlace(docSnap.data().place);
        setDate(docSnap.data().date);
        setContents(docSnap.data().contents);
        setCreated(docSnap.data().created);
      } else {
        console.log("no such document");
      }
    };
    fetchData();
  },[]);
  const updateData = async()=>{
    const docData = {
      place: place,
      date: date,
      contents: contents,
      created: created,

    };
    await setDoc(doc(db,"exercises",id), docData);
    navigate("/exerciseList");
  }
  const cancelUpdate = () => {
    navigate("/exerciseList");
  }
  return (
    <div className="exerciseUpdate">
      <h2>変更したい部分を書き換えてください</h2>
      <form>
        <div>
          実施場所
          <br />
          <input
            className="place"
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div>
          日程
          <br />
          <input
            className="date"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          詳細
          <br />
          <textarea
            className="contents"
            type="text"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" onClick={updateData} className="btn">
            変更
          </Button>
          <Button variant="contained" onClick={cancelUpdate} className="btn">
            キャンセル
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ExerciseUpdate