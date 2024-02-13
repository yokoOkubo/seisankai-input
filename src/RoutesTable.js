import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import GyoujiList from './components/gyouji/GyoujiList';
import GyoujiInput from './components/gyouji/GyoujiInput';
import GyoujiUpdate from './components/gyouji/GyoujiUpdate';
import Exercise from './components/exercise/Exercise';
import Join from './components/join/Join';
import NewspaperInput from './components/newspaper/NewspaperInput';
import Gyouji from './components/gyouji/Gyouji';

const RoutesTable = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<GyoujiList />} />
      <Route path="gyouji" element={<Gyouji />} />
      <Route path="gyoujiInput" element={<GyoujiInput />} />
      <Route path="gyoujiUpdate/:id" element={<GyoujiUpdate />} />
      <Route path="joinList" element={<Join />} />
      <Route path="joinInput" element={<Join />} />
      <Route path="exercise" element={<Exercise />} />
      <Route path="newspaperInput" element={<NewspaperInput />} />
    </Route>
  )
);

export default RoutesTable