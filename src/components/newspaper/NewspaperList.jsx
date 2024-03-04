import React, {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const NewspaperList = () => {
  const [papers, setPaper] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ref = collection(db, 'dayori');
    const q = query(ref, orderBy('title'));
    onSnapshot(q, (snapshot) => {
      setPaper(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  //---各ドキュメントの削除ボタンを押した時の処理
  const deleteJoin = async (id) => {
    await deleteDoc(doc(db, 'dayori', id));
  };

  //---各ドキュメントの変更ボタンを押した時の処理
  const updateJoin = (id) => {
    navigate('/newspaperUpdate/' + id);
  };

  return (
    <div className="newspaperList">
      <table className="newspaperTable">
        <caption>
          <h2>西三会だより一覧</h2>
        </caption>
        <thead>
          <tr>
            <th>年月</th>
            <th>URL</th>
            <th>削除</th>
            <th>変更</th>
          </tr>
        </thead>

        <tbody>
          {papers.map((paper) => (
            <tr key={paper.id}>
              <td>{paper.title}</td>
              <td>{paper.url}</td>
              <td>
                <Button variant="contained" onClick={() => deleteJoin(paper.id)}>
                  削除
                </Button>
              </td>
              <td>
                <Button variant="contained" onClick={() => updateJoin(paper.id)}>
                  変更
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default NewspaperList