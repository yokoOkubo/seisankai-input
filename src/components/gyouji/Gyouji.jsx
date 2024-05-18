import React, { useEffect, useState } from 'react'
import './Gyouji.scss';
import '../../App.scss';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../side/Sidebar';

const Gyouji = () => {
  //ログインしていないならログイン画面へ
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser == null) {
      navigate('/');
    }
  }, [navigate]);

  const [gyoujis, setGyoujis] = useState([]);

  useEffect(() => {
    const ref = collection(db, 'gyouji');
    const events = query(ref, orderBy('day1'));
    onSnapshot(events, (snapshot) => {
      setGyoujis(
        snapshot.docs.map((doc) => {
          return { ...doc.data() };
        })
      );
    });
  }, []);

  //---DBのday1,day2を受け取りそれを表示するための文字列にする
  const toDisplayDateString = (day1, day2) => {
    let str1 = toDateString(day1);
    let str2 = toDateString(day2);

    if (str1 == '') return '';
    if (str2 == '') return str1;
    return str1 + ' - ' + str2;
  };
  //---DBのtimestring型をDateに変換しx年x月x日の文字列にする
  const toDateString = (day) => {
    console.log('day=', day);
    let str = '';
    if (day) {
      const date = new Date(day.toDate());
      str =
        date.getFullYear() +
        '年' +
        (date.getMonth() + 1) +
        '月' +
        date.getDate() +
        '日';
    }
    return str;
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="gyouji">
          西三会行事
          {gyoujis.map((gyouji) => {
            return (
              <div className="one">
                <h2>{gyouji.title}</h2>
                <div>日時：{toDisplayDateString(gyouji.day1, gyouji.day2)}</div>
                <div>内容：{gyouji.contents}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Gyouji
