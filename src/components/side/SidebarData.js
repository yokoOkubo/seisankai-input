//https://www.youtube.com/watch?v=YtkwC5lSW0M&t=787sを参考にした
import React from 'react'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ViewListIcon from '@mui/icons-material/ViewList';
import GyoujiInput from '../gyouji/GyoujiInput';
import GyoujiUpdate from '../gyouji/GyoujiUpdate';
import GyoujiList from '../gyouji/GyoujiList';
import Exercise from '../exercise/Exercise';
import Join from '../join/Join';
import NewspaperInput from '../newspaper/NewspaperInput';

export const SidebarData = [
  {
    title: '町会行事一覧',
    icon: <ViewListIcon />,
    pageID: 0,
    link: <GyoujiList />,
    display: true,
  },
  {
    title: '行事データ新規作成',
    icon: <NoteAddIcon />,
    pageID: 1,
    link: <GyoujiInput />,
    display: true,
  },
  {
    title: '行事データ変更',
    icon: <NoteAddIcon />,
    pageID: 2,
    link: <GyoujiUpdate />,
    display: false,
  },
  {
    title: '仲間募集一覧',
    icon: <ViewListIcon />,
    pageID: 10,
    link: <Join />,
    display: true,
  },
  {
    title: '仲間募集新規作成',
    icon: <NoteAddIcon />,
    pageID: 11,
    link: <Join />,
    display: true,
  },
  {
    title: 'ラジオ体操',
    icon: <NoteAddIcon />,
    pageID: 20,
    link: <Exercise />,
    display: true,
  },
  {
    title: '西三会だより新規作成',
    icon: <NoteAddIcon />,
    pageID: 30,
    link: <NewspaperInput />,
    display: true,
  },
];
