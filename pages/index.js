// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
// import RectangleSVG from '../assets/Rectangle.svg'
import {
  CircularProgress,
  Collapse,
  Container,
  Grow,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
import { Appbar } from '../components/appbar';
import { Breadcrumb } from '../components/bread';
import { Header } from '../components/title.js';
import { UserLine } from '../components/userline';
import { Form } from '../components/form';
import {theme} from '../theme/theme';
import {Confirm} from '../components/confirm'
import { CustList } from '../components/list'

import ReactLoading from 'react-loading';


import {
  SMALL,
  MEDIUM,
  LARGE,
  CONFIRM,
  ALERT,
  NONE,
  NO,
  YES,
  PENDING,
} from '../helpers/constants';
import { useState } from 'react';

export default function Home() {

  const large = useMediaQuery('(min-width:950px)');

  const medium = useMediaQuery('(min-width:860px)');

  let size;

  if(large) size = LARGE
  else if(medium) size = MEDIUM
  else size = SMALL

  //state
  const [isRead, setIsRead] = useState(true)

  /***********************************/
  const [info, setInfo] = useState({
    name: 'Иванова Анна Михайловна',
    email: 'ivanova@mail.ru',
    tele: 'Укажите номер телефона'
  })

  /***********************************/
  const [alertModal, setAlertModal] = useState({
    state: CONFIRM,
    resp: NO,
    payload:{}
  })


  /******************************************/
  const args = {}

  args.size = size
  args.isRead = isRead
  args.setIsRead = setIsRead
  args.info = info
  args.setInfo = setInfo
  args.alertModal = alertModal
  args.setAlertModal = setAlertModal


  return (
    <ThemeProvider theme={theme}>
    <Container className='container'>
      <Appbar {...args}/>
      <Header/>
      <Breadcrumb {...args}/>
      <UserLine {...args}/>
      
      {
        isRead ?
        <CustList {...args}/> :
        <Form {...args}/>
      }

      {
        alertModal.state !== NONE &&
          <Confirm {...args}/>
      }
      
      {
        alertModal.resp === YES &&
        <ReactLoading id='loading' type={'bubbles'} color={'#482880'} height={667} width={375} />
      }
    </Container>
    </ThemeProvider>
  )
}