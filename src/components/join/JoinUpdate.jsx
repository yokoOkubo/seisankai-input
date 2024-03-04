import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import './JoinUpdate.scss'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';


const JoinUpdate = (props) => {
  const {id} = useParams(); //const params = useParams();params.idと同じ
  
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [created, setCreated] = useState("");

  useEffect(() => {
    //useEffect内で非同期処理を行う場合にはuseEffectの引数の関数を非同期にすることはできないため、非同期の別の関数を作る
    const fetchData = async () => {
      const docRef = doc(db, 'join_us', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setContents(docSnap.data().contents);
        setCreated(docSnap.data().created);
        console.log(docSnap.data());
      } else {
        console.log("no such document");
      }
    };
    fetchData();
  }, []);

  const updateJoin = async () => {
    const docData = {
      title: title,
      contents: contents,
      created: created,
    };
    await setDoc(doc(db, 'join_us', id), docData);
    navigate('/joinList');
  };


  const cancelUpdate = () => {
    navigate("/joinList");
  }

  return (
    <div className="gyoujiUpdate">
      <h2>変更したい部分を書き換えてください</h2>
      <form>
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
          <Button variant="contained" onClick={updateJoin} className="btn">
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

export default JoinUpdate