import React, { useState } from 'react'
import { db } from '../../firebase';
import { Button } from '@mui/material';
import { addDoc, collection} from 'firebase/firestore';
import "./GyoujiInput.scss"
// import DateFnsUtils from '@date-io/date-fns';
// import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import  DatePicker from '@mui/lab/DatePicker';

const GyoujiInput = () => {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState('');
  const [contents, setContents] = useState('');
  const [day2, setDay2] = useState(new Date());

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

  }
  return (
    <div className="gyoujiInput">
      <h2>新しく作成する行事を入力してください</h2>
      <form>
        <div>
          日付a
          <br />
          <input
            className="title1"
            type="text"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
          />
        </div>

        <div>
          日付2
          <br />
          <DatePicker
            label="Controlled picker"
            value={day2}
            onChange={(newValue) => setDay2(newValue)}
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