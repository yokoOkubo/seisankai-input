import React, { useEffect, useState } from 'react'
import './GyoujiList.scss';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const GyoujiList = () => {
  const [gyoujis,setGyoujis] = useState([]);
  const navigate = useNavigate();

  //---最初gyoujiコレクションのデータを
  useEffect(()=>{
    const ref =collection(db, "gyouji");
    const events = query(ref,orderBy("day1"));
    onSnapshot(events,(snapshot)=> {
      setGyoujis(snapshot.docs.map((doc)=>{
        console.log(doc.data().day1);
        return {
          id: doc.id,
          ...doc.data(),
        };
      }));
    });
  },[]);
  
  //---各ドキュメントの削除ボタンを押した時の処理
  const deleteGyouji = async (id) => {
    await deleteDoc(doc(db, 'gyouji', id));
  }
  
  //---各ドキュメントの変更ボタンを押した時の処理
  const updateGyouji = (id) => {
    navigate("/gyoujiUpdate/" + id);
  };

  //---DBのday1,day2を受け取りそれを表示するための文字列にする
  const toDisplayDateString = (day1,day2) => {
    let str1 = toDateString(day1);
    let str2 = toDateString(day2);
    
    if (str1 == "") return "";
    if (str2 == "") return str1;
    return str1 + " - " + str2;
  }
  //---DBのtimestring型をDateに変換しx年x月x日の文字列にする
  const toDateString = (day) => {
    console.log("day=",day);
    let str = "";
    if (day) {
      const date = new Date(day.toDate());
      str = date.getFullYear() + "年" +
        (date.getMonth() + 1) + "月" +
        date.getDate() + "日"
    }
    return str;
  }

  return (
    <div className="gyoujiList">
      <table className="gyoujiTable">
        <caption><h2>町内会行事一覧</h2></caption>
        <thead>
        <tr>
        <th>日付</th>
        <th>タイトル</th>
        <th>内容</th>
        <th>削除</th>
        <th>変更</th>
        </tr>
        </thead>
        
        <tbody>
        {gyoujis.map((gyouji) => (

          <tr key={gyouji.id}>
            <td>{toDisplayDateString(gyouji.day1,gyouji.day2)}</td>
            <td>{gyouji.title}</td>
            <td>{gyouji.contents.substr(0, 10) + '...'}</td>
            <td>
              <Button
                variant="contained"
                onClick={() => deleteGyouji(gyouji.id)}
              >
                削除
              </Button>
            </td>
            <td>
              <Button
                variant="contained"
                onClick={() => updateGyouji(gyouji.id)}
              >
                変更
              </Button>
            </td>
        </tr>
        ))}
        </tbody>
        </table>
      </div>
      )
}
export default GyoujiList
