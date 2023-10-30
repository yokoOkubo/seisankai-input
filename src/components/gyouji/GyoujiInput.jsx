import React, { useState } from 'react'
import db from '../../firebase';
import { Button } from '@mui/material';
import { addDoc, collection} from 'firebase/firestore';
import "./GyoujiInput.scss"

const GyoujiInput = () => {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState('');
  const [contents, setContents] = useState('');

  const inputData =  async() => {
    alert('inputData0');
    try {
      alert("inputData")
      const docData = {
        title1: title1,
        title2: title2,
        contents: contents,
      };
      const docRef = await addDoc(collection(db, 'gyouji'), docData);
      alert(docRef.id);

    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  return (
    <div className="gyoujiInput">
      <h2>新しく作成する行事を入力してください</h2>
      <form>
        <div>
          日付<br />
          <input
            className="title1"
            type="text"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
          />
        </div>
        <div>
          タイトル<br/>
          <input
            className="title2"
            type="text"
            value={title2}
            onChange={(e) => setTitle2(e.target.value)}
          />
        </div>
        <div>
          内容<br/>
          <textarea
            className="contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" onClick={inputData} className='btn'>
            新規作成
          </Button>
        </div>
      </form>
    </div>
  );
}

export default GyoujiInput