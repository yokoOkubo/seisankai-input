import React, { useEffect, useState } from 'react'
import "./NewspaperInput.scss"
import '../../App.scss';
import { Button } from '@mui/base';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../side/Sidebar';

const NewspaperInput = () => {
  //ログインしていないならログイン画面へ
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser == null) {
      navigate('/');
    }
  }, [navigate]);

  const [title, setTitle] = useState([]);
  const [url, setUrl] = useState([]);

  const inputData = async () => {
    try {
      const docData = {
        title: title,
        url: url,
      };
      await addDoc(collection(db, 'dayori'), docData);
      navigate('/newspaperList');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="newspaperInput">
          <h2>
            新しくGoogle Driveに保存した西三会だよりの情報を入力してください
          </h2>
          <form>
            <div>
              年月をyyyymmの形式で（たとえば2024年2月なら202402として入力）
              <br />
              <input
                className="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              URL（Google Driveのdayoriフォルダに保存したPDFファイルのURL）
              <br />
              <input
                className="filename"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div>
              <Button variant="contained" onClick={inputData} className="btn">
                新規作成
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewspaperInput