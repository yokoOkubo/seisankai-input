import React, {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './NewspaperList.scss';
import '../../App.scss';
import Sidebar from '../side/Sidebar';

const NewspaperList = () => {
  //ログインしていないならログイン画面へ
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser == null) {
      navigate('/');
    }
  }, [navigate]);

  const [papers, setPaper] = useState([]);

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
    <div className="App">
      <Sidebar />
      <div className="main">
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
                    <Button
                      variant="contained"
                      onClick={() => deleteJoin(paper.id)}
                    >
                      削除
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      onClick={() => updateJoin(paper.id)}
                    >
                      変更
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default NewspaperList