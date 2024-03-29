import React, { useEffect, useState } from 'react'
import "./Join.scss"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

const Join = () => {
  const [joins, setJoins] = useState([]);

  
  useEffect(() => {
    const ref = collection(db, 'join_us');
    const joins = query(ref, orderBy("created"));
    onSnapshot(joins, (snapshot) => {
      setJoins(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);
  return (
    <div className="join">
      {joins.map((join) => {
        return (
          <div className="one">
            仲間募集
            <h2>{join.title}</h2>
            <div>内容：{join.contents}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Join