import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import "./NewspaperList.scss";

export const Newspaper = () => {
  const [papers, setPaper] = useState([]);
  useEffect(() => {
    const dayori = collection(db, 'dayori');
    const q = query(dayori,orderBy("title"));
    onSnapshot(q, (snapshot) => {
      setPaper(
        snapshot.docs.map((doc) => {
          console.log(doc);
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  const dateStr =(title)=> {
    const y = title.substr(0,4);
    const m = title.substr(4,2);
    return y+"年"+m+"月";
  }

  return (
    <div className="newspaper">
      西三会だより

      {papers.map((paper) => {
        return (
          <div className="titles" key={paper.title}>
            <a href={paper.url} target="_blank" className="one">
              {dateStr(paper.title)}
            </a>
          </div>
        );
      })}
      
    </div>
  );
}
export default Newspaper;