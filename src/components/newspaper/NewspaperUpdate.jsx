import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { Button } from '@mui/material';
import "./NewspaperUpdate.scss"

const NewspaperUpdate = (props) => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(()=>{
    const fetchData = async() => {
      const ref = doc(db, "dayori", id);
      const snap = await getDoc(ref);

      if(snap.exists()) {
        setTitle(snap.data().title);
        setUrl(snap.data().url);
      } else {
        console.log("no such document");
      }
    }
    fetchData();
  },[]);
  const updateData = async() => {
    const docData = {
      title: title,
      url: url,
    };
    await setDoc(doc(db, 'dayori', id), docData);
    navigate("/newspaperList");
  }
  const cancelData = () => {
    navigate("/newspaperList");
  }
  return (
    <div className="newspaperUpdate">
      <h2>変更したい項目のみ書き換えてください</h2>
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
          <Button variant="contained" onClick={updateData} className="btn">
            変更
          </Button>
          <Button variant="contained" onClick={cancelData} className="btn">
            キャンセル
          </Button>{' '}
        </div>
      </form>
    </div>
  );
}
export default NewspaperUpdate;