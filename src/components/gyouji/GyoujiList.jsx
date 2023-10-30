import React, { useEffect, useState } from 'react'
import './GyoujiList.scss';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import db from '../../firebase';
import Button from '@mui/material/Button';
import GyoujiUpdate from './GyoujiUpdate';

const GyoujiList = () => {
  const [gyoujis,setGyouji] = useState([]);
  const [toUpdateFlg, setToUpdateFlg] = useState(false);
  const [gyoujiForUpdate, setGyoujiForUpdate] = useState();

  useEffect(()=>{
    const events =collection(db, "gyouji");
    onSnapshot(events,(snapshot)=> {
      setGyouji(snapshot.docs.map((doc)=>{
        return {
          id: doc.id,
          ...doc.data(),
        };
      }));
    });
  },[]);

  const deleteGyouji = async (id) => {
    alert(id);
    await deleteDoc(doc(db, 'gyouji', id));
  }

  const updateGyouji = (gyouji) => {
    setToUpdateFlg(true);
    setGyoujiForUpdate(gyouji);
  };

if (toUpdateFlg === false) {
  return (
    <div className="gyoujiList">
      <table className="gayoujiTable">
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
            <td>{gyouji.title2}</td>
            <td>{gyouji.title1}</td>
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
            onClick={() => updateGyouji(gyouji)}
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
    } else
     {
      return (
        <GyoujiUpdate
          gyouji={gyoujiForUpdate}
          setToUpdateFlg={setToUpdateFlg}
        />
      );
    }
}
export default GyoujiList
