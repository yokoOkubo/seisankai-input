import React, { useState } from 'react'
import { db } from '../../firebase';
import { Button } from '@mui/material';
import { addDoc, collection} from 'firebase/firestore';
import "./GyoujiInput.scss"
// import  DatePicker from '@mui/lab/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

const GyoujiInput = () => {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState('');
  const [contents, setContents] = useState('');
  const [day1, setDay1] = useState(null);
  const [day2, setDay2] = useState(null);

  const inputData =  async() => {
    try {
      const docData = {
        title1: title1,
        title2: title2,
        contents: contents,
      };
      const docRef = await addDoc(collection(db, 'gyouji'), docData);
      console.log(docRef.id);
    } catch (err) {
      console.log(err);
    }
  };
  const cancelInput = ()=> {
    alert(day1);
  }
  return (
    <div className="gyoujiInput">
      <h2>新しく作成する行事を入力してください</h2>
      <form>
        <div>
          行事が行われる日付
          <br />
          <input
            className="title1"
            type="text"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
          />
        </div>

        <div>
          行事が行われる日付
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            
              <DatePicker
                label=""
                value={day1}
                onChange={(newValue) => setDay1(newValue)}
              />
            
          </LocalizationProvider>
        </div>

        <div>
          1日で終わらない場合には最終日
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            
              <DatePicker
                value={day2}
                onChange={(newValue) => setDay2(newValue)}
              />
            
          </LocalizationProvider>
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
          <Button variant="contained" onClick={inputData} className="btn">
            新規作成
          </Button>
          <Button variant="contained" onClick={cancelInput} className="btn">
            キャンセル
          </Button>
        </div>
      </form>
    </div>
  );
}

export default GyoujiInput