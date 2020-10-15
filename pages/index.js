import { Container, ThemeProvider, useMediaQuery, Zoom } from '@material-ui/core';
import { Appbar } from '../components/appbar';
import { Breadcrumb } from '../components/bread';
import { Header } from '../components/title.js';
import { UserLine } from '../components/userline';
import { Form } from '../components/form';
import {theme} from '../theme/theme';
import {Confirm} from '../components/confirm'
import { CustList } from '../components/list'

import ReactLoading from 'react-loading';


import { SMALL, MEDIUM, LARGE, NONE, NO, YES, IPHONE } from '../helpers/constants';
import { useState } from 'react';


export default function Home() {

  const large = useMediaQuery('(min-width:950px)');

  const medium = useMediaQuery('(min-width:860px)');

  const iphone = useMediaQuery('(max-width:500px)');

  let size;

  if(large) size = LARGE
  else if(medium) size = MEDIUM
  else if(iphone) size = IPHONE
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
    state: NONE,
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
      <Appbar size={size} info={info}/>
      <Header/>
      <Breadcrumb size={size} />
      <UserLine {...args}/>

      {
        isRead ?
        <CustList size={size} info={info}/> :
        <Form size={size} setAlertModal={setAlertModal}/>
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