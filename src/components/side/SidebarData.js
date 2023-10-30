//https://www.youtube.com/watch?v=YtkwC5lSW0M&t=787sを参考にした
import React from 'react'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ViewListIcon from '@mui/icons-material/ViewList';
import GyoujiInput from '../gyouji/GyoujiInput';
import GyoujiList from '../gyouji/GyoujiList';
import Exercise from '../exercise/Exercise';
import Newspaper from '../newspaper/Newspaper';
import Join from '../join/Join';

export const SidebarData = [
  {
    title: '町会行事一覧',
    icon: <ViewListIcon />,
    pageID: 0,
    link: <GyoujiList />,
  },
  {
    title: '行事データ新規作成',
    icon: <NoteAddIcon />,
    pageID: 1,
    link: <GyoujiInput />,
  },
  {
    title: '仲間募集一覧',
    icon: <ViewListIcon />,
    pageID: 10,
    link: <Join />,
  },
  {
    title: '仲間募集新規作成',
    icon: <NoteAddIcon />,
    pageID: 11,
    link: <Join />,
  },
  {
    title: 'ラジオ体操',
    icon: <NoteAddIcon />,
    pageID: 20,
    link: <Exercise />,
  },
  {
    title: '西三会だより',
    icon: <NoteAddIcon />,
    pageID: 30,
    link: <Newspaper />,
  },
];
