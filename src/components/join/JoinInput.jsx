import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { Button } from '@mui/material';
import { addDoc, collection} from 'firebase/firestore';
import "./JoinInput.scss"
import '../../App.scss';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../side/Sidebar';

const JoinInput = () => {
  //ログインしていないならログイン画面へ
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser == null) {
      navigate('/');
    }
  }, [navigate]);



  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');


  //---新規作成ボタンに対する処理
  const inputData = async () => {
    try {
      const docData = {
        title: title,
        contents: contents,
        created: new Date(),
      };
      const docRef = await addDoc(collection(db, 'join_us'), docData);
      console.log(docRef.id);
    } catch (err) {
      console.log(err);
    }
    navigate('/joinList');
  };
  //---キャンセルボタンに対する処理
  const cancelInput = () => {
    navigate('/joinList');
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="joinInput">
          <h2>新しく作成する仲間募集を入力してください</h2>
          <form>
            <div>
              タイトル
              <br />
              <input
                className="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              内容
              <br />
              <textarea
                className="contents"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinInput;