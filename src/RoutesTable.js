import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import GyoujiList from './components/gyouji/GyoujiList';
import GyoujiInput from './components/gyouji/GyoujiInput';
import GyoujiUpdate from './components/gyouji/GyoujiUpdate';
import Exercise from './components/exercise/Exercise';
import ExerciseList from './components/exercise/ExerciseList';
import ExerciseUpdate from './components/exercise/ExerciseUpdate';
import ExerciseInput from './components/exercise/ExerciseInput';
import Join from './components/join/Join';
import Gyouji from './components/gyouji/Gyouji';
import JoinInput from './components/join/JoinInput';
import JoinList from './components/join/JoinList';
import JoinUpdate from './components/join/JoinUpdate';
import Newspaper from './components/newspaper/Newspaper';
import NewspaperInput from './components/newspaper/NewspaperInput';
import NewspaperList from './components/newspaper/NewspaperList';
import NewspaperUpdate from './components/newspaper/NewspaperUpdate';

const RoutesTable = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<GyoujiList />} />
      <Route path="gyouji" element={<Gyouji />} />
      <Route path="gyoujiInput" element={<GyoujiInput />} />
      <Route path="gyoujiUpdate/:id" element={<GyoujiUpdate />} />
      <Route path="join" element={<Join />} />
      <Route path="joinList" element={<JoinList />} />
      <Route path="joinInput" element={<JoinInput />} />
      <Route path="joinUpdate/:id" element={<JoinUpdate />} />
      <Route path="exercise" element={<Exercise />} />
      <Route path="exerciseList" element={<ExerciseList />} />
      <Route path="exerciseInput" element={<ExerciseInput />} />
      <Route path="exerciseUpdate/:id" element={<ExerciseUpdate />} />
      <Route path="newspaper" element={<Newspaper />} />
      <Route path="newspaperList" element={<NewspaperList />} />
      <Route path="newspaperInput" element={<NewspaperInput />} />
      <Route path="newspaperUpdate/:id" element={<NewspaperUpdate />} />
    </Route>
  )
);

export default RoutesTable