import { Container, ThemeProvider, useMediaQuery } from '@material-ui/core';
import ReactLoading from 'react-loading';
import { useReducer } from 'react';
import {theme} from '../theme/theme';


import {Appbar, Breadcrumb, Header, UserLine, Form, Confirm, CustList} from '../components'
import { SMALL, MEDIUM, LARGE, NONE, YES, IPHONE } from '../helpers/constants';
import {initialState, stateReducer} from '../states/reducer'

export default function Home() {

  const large = useMediaQuery('(min-width:950px)');
  const medium = useMediaQuery('(min-width:860px)');
  const iphone = useMediaQuery('(max-width:500px)');

  let size
  if(large) size = LARGE
  else if(medium) size = MEDIUM
  else if(iphone) size = IPHONE
  else size = SMALL

  const [appState, stateDispatch] = useReducer(
                                      stateReducer, {...initialState}
                                    )
  return (
    <ThemeProvider theme={theme}>
    <Container className='container'>
      <Appbar size={size} name={appState.name}/>
      <Header/>
      <Breadcrumb size={size} />
      <UserLine size={size} state={appState} dispatch={stateDispatch} />

      {
        appState.isRead ?
        <CustList size={size} state={appState}/> :
        <Form size={size} dispatch={stateDispatch}/>
      }

      {
        appState.modalState !== NONE &&
          <Confirm size={size} state={appState} dispatch={stateDispatch}/>
      }
      
      {
        appState.resp === YES &&
        <ReactLoading id='loading' type={'bubbles'} color={'#482880'} height={667} width={375} />
      }
    </Container>
    </ThemeProvider>
  )
}