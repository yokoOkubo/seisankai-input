import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { addDoc, collection} from 'firebase/firestore';
import "./GyoujiInput.scss"
// import  DatePicker from '@mui/lab/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { jaJP } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

class DateAdapter extends AdapterDateFns {
  // 参考サイトの実装例よりも、端折っているが、日曜始まりが固定なら以下で十分。
  getWeekdays = () => ['日', '月', '火', '水', '木', '金', '土'];
}
const GyoujiInput = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [day1, setDay1] = useState("");
  const [day2, setDay2] = useState("");

  const navigate = useNavigate();

  //
  const theme = createTheme(
    {},
    jaJP // x-date-pickers translations
  );
  //---新規作成ボタンに対する処理
  const inputData =  async() => {
    try {
      const docData = {
        day1: day1,
        day2: day2,
        title: title,
        contents: contents,
      };
      const docRef = await addDoc(collection(db, 'gyouji'), docData);
      console.log(docRef.id);
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };
  //---キャンセルボタンに対する処理
  const cancelInput = ()=> {
    navigate('/');
  }

  return (
    <div className="gyoujiInput">
      <h2>新しく作成する行事を入力してください</h2>
      <form>
        <div>
          行事が行われる日付
          <br />
          <ThemeProvider theme={theme}>
            <LocalizationProvider
              dateAdapter={DateAdapter}
              dateFormats={{ monthAndYear: 'yyyy年 MM月', monthShort: 'MM月' }}
            >
              <DatePicker
                value={day1}
                onChange={(newValue) => setDay1(newValue)}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>

        <div>
          1日で終わらない場合には最終日
          <br />
          <LocalizationProvider
            dateAdapter={DateAdapter}
            dateFormats={{ monthAndYear: 'yyyy年 MM月', monthShort: 'MM月' }}
          >
            <DatePicker
              value={day2}
              onChange={(newValue) => setDay2(newValue)}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            onClick={(e) => setDay2('')}
            className="deletebtn"
          >
            最終日は削除
          </Button>
        </div>

        <div>
          タイトル
          <br />
          <input
            className="title2"
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
  );
}

export default GyoujiInput