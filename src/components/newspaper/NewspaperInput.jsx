import React, { useState } from 'react'
import "./NewspaperInput.scss"
import { Button } from '@mui/base';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const NewspaperInput = () => {
  const [title, setTitle] = useState([]);
  const [url, setUrl] = useState([]);
 
  const inputData = async()=> {
    try {
      const docData = {
        title: title,
        url: url
      }
      await addDoc(collection(db,"dayori"), docData);
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <div className="newspaperInput">
      <h2>新しくGoogle Driveに保存した西三会だよりの情報を入力してください</h2>
      <form>
        <div>
          タイトル（yyyy年m月）
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
  );
}

export default NewspaperInput