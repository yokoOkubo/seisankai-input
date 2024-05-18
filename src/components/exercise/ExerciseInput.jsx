import React, { useState, useEffect } from 'react';
import "./ExerciseInput.scss"
import '../../App.scss';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Sidebar from '../side/Sidebar';


const ExerciseInput = () => {
  //ログインしていないならログイン画面へ
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser == null) {
      navigate('/');
    }
  }, [navigate]);

  
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [contents, setContents] = useState('');

  const inputData = async () => {
    try {
      const docData = {
        place: place,
        date: date,
        contents: contents,
        created: new Date(),
      };
      const docRef = await addDoc(collection(db, 'exercises'), docData);
      console.log(docRef.id);
    } catch (err) {
      console.log(err);
    }
    navigate('/exerciseList');
  };
  const cancelInput = () => {
    navigate('/exerciseList');
  };
  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="exerciseUpdate">
          <h2>新しく作成するラジオ体操情報を入力してください</h2>
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
              <Button variant="contained" onClick={inputData} className="btn">
                新規作成
              </Button>
              <Button variant="contained" onClick={cancelInput} className="btn">
                キャンセル
              </Button>
            </div>{' '}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExerciseInput