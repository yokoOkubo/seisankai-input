import React, { useEffect, useState } from 'react'
import './JoinList.scss';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const JoinList = () => {
  const [joins,setJoins] = useState([]);
  const navigate = useNavigate();

  //---最初gyoujiコレクションのデータを
  useEffect(()=>{
    const ref =collection(db, "join_us");
    const articles = query(ref,orderBy("created"));
    onSnapshot(articles,(snapshot)=> {
      setJoins(snapshot.docs.map((doc)=>{
        return {
          id: doc.id,
          ...doc.data(),
        };
      }));
    });
  },[]);
  

  //---各ドキュメントの削除ボタンを押した時の処理
  const deleteJoin = async (id) => {
    await deleteDoc(doc(db, 'join_us', id));
  }
  
  //---各ドキュメントの変更ボタンを押した時の処理
  const updateJoin = (id) => {
    navigate("/joinUpdate/" + id);
  };
  return (
    <div className="joinList">
      <table className="joinTable">
        <caption><h2>仲間募集一覧</h2></caption>
        <thead>
        <tr>
        <th>タイトル</th>
        <th>内容</th>
        <th>削除</th>
        <th>変更</th>
        </tr>
        </thead>
        
        <tbody>
        {joins.map((join) => (

          <tr key={join.id}>
            <td>{join.title}</td>
            <td>{join.contents.substr(0, 20) + '...'}</td>
            <td>
              <Button
                variant="contained"
                onClick={() => deleteJoin(join.id)}
              >
                削除
              </Button>
            </td>
            <td>
              <Button
                variant="contained"
                onClick={() => updateJoin(join.id)}
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
export default JoinList
