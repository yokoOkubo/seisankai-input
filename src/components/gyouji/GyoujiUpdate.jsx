import React, { useEffect, useState } from 'react'
import { Button, ThemeProvider, createTheme } from '@mui/material';
import './GyoujiUpdate.scss'
import '../../App.scss';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker, LocalizationProvider, jaJP } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Sidebar from '../side/Sidebar';

class DateAdapter extends AdapterDateFns {
  // 参考サイトの実装例よりも、端折っているが、日曜始まりが固定なら以下で十分。
  getWeekdays = () => ['日', '月', '火', '水', '木', '金', '土'];
}

const GyoujiUpdate = (props) => {
  const { id } = useParams(); //const params = useParams();params.idと同じ

  //ログインしていないならログイン画面へ
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser == null) {
      navigate('/');
    }
  }, [navigate]);

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [day1, setDay1] = useState('');
  const [day2, setDay2] = useState('');

  const theme = createTheme(
    {},
    jaJP // x-date-pickers translations
  );

  useEffect(() => {
    //useEffect内で非同期処理を行う場合にはuseEffectの引数の関数を非同期にすることはできないため、非同期の別の関数を作る
    const fetchData = async () => {
      const docRef = doc(db, 'gyouji', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //Firebaseのtimestamp型をtoDate()で変換しnew Dateの引数とする
        //DatePickerのvalueに指定するものはDateオブジェクトであるため
        setDay1(new Date(docSnap.data().day1.toDate()));
        if (docSnap.data().day2) {
          setDay2(new Date(docSnap.data().day2.toDate()));
        }
        setTitle(docSnap.data().title);
        setContents(docSnap.data().contents);
        console.log(docSnap.data());
      } else {
        console.log('no such document');
      }
    };
    fetchData();
  }, []);

  const updateGyouji = async () => {
    const docData = {
      day1: day1,
      day2: day2,
      title: title,
      contents: contents,
    };
    await setDoc(doc(db, 'gyouji', id), docData);
    navigate('/gyoujiList');
  };

  const cancelUpdate = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="gyoujiUpdate">
          <h2>変更したい部分を変更してください</h2>
          <form>
            <div>
              行事が行われる日付
              <br />
              <ThemeProvider theme={theme}>
                <LocalizationProvider
                  dateAdapter={DateAdapter}
                  dateFormats={{
                    monthAndYear: 'yyyy年 MM月',
                    monthShort: 'MM月',
                  }}
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
                dateFormats={{
                  monthAndYear: 'yyyy年 MM月',
                  monthShort: 'MM月',
                }}
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
              <Button
                variant="contained"
                onClick={updateGyouji}
                className="btn"
              >
                変更
              </Button>
              <Button
                variant="contained"
                onClick={cancelUpdate}
                className="btn"
              >
                キャンセル
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GyoujiUpdate