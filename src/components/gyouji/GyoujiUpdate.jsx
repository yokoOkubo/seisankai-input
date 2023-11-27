import React, { useState } from 'react'
import { Button } from '@mui/material';
import './GyoujiUpdate.scss'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const GyoujiUpdate = (props) => {
  const { gyouji, setToUpdateFlg } = props;

  const [title1, setTitle1] = useState(gyouji.title1);
  const [title2, setTitle2] = useState(gyouji.title2);
  const [contents, setContents] = useState(gyouji.contents);

  const updateGyouji = async () => {
    const docData = {
      title1: title1,
      title2: title2,
      contents: contents,
    };
    await setDoc(doc(db, 'gyouji', gyouji.id), docData);
    setToUpdateFlg(false);
    alert("falseにした");
  };

  const cancelUpdate = () => {
    setToUpdateFlg(false);
  }
  return (
    <div className="gyoujiUpdate">
      <h2>変更したい部分を変更してください</h2>
      <form>
        <div>
          日付
          <br />
          <input
            className="title1"
            type="text"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
          />
        </div>
        <div>
          タイトル
          <br />
          <input
            className="title2"
            type="text"
            value={title2}
            onChange={(e) => setTitle2(e.target.value)}
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
          <Button variant="contained" onClick={updateGyouji} className="btn">
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

export default GyoujiUpdate