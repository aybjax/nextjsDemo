import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Card,
  CardContent,
  Divider,
  Box,
  TextField,
  Grid,
  CardHeader,
  useMediaQuery,
} from '@material-ui/core';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';


import { CustButton } from '../components/button';

import {
  MEDIUM,
  LARGE,
  NONE,
  CONFIRM,
  YES,
  NO,
  PENDING,
} from '../helpers/constants'
import { useForm } from 'react-hook-form';

const useStyles = makeStyles({
    largeIcon: {
      transform: 'scale(1.5)',
    },
  });

export const Form = ({size, setInfo, setIsRead, setAlertModal, alertModal}) => {
    let iphone = false;
    
    iphone = useMediaQuery('(max-width:500px)');

    const {register, handleSubmit, errors} = useForm()

    const save = (data) => {
      setAlertModal({
        state: CONFIRM,
        resp: PENDING,
        payload: {
          ...data,
        }
      })
    }


    let medium=false;
    let large=false;

    let inputMargin = 'normal'

    if(size === LARGE)
    {
      large=true;
      medium=true
    }
    else if(size === MEDIUM)
    {
      medium=true;
    }else if(iphone)
    {
      inputMargin = 'dense'
    }

    const classes = useStyles();

    const direction = medium ? 'row' : 'column';

    const mTop = medium ? 0 : 2;

    useEffect(()=>{
      if(alertModal.resp === YES && alertModal.payload !== {} && alertModal.state === NO)
      {
        setIsRead(false)
        setInfo(prev => (
          {
            ...prev,
            ...payload,
          }
        ))
        setAlertModal({
          payload: {},
          resp: NO,
          state: NONE,
        })
      }
    })

    const outerStyling = !medium ? {paddingRight: 20, paddingLeft: 20 } : {}
  
    return (
      <form onSubmit={handleSubmit(save)}>
      <Card>
          <CardHeader></CardHeader>
          <CardContent>
              <form style = {outerStyling}>
              <Grid spacing={3} container direction={direction} justify="space-around" alignItems="center">
                      { large &&
                          <PermContactCalendarIcon className={classes.largeIcon}/>
                      }

                        <TextField fullWidth={!medium} margin={inputMargin}
                        id="outlined-required" label="Фамилия и имя" name='name'
                          error={errors.name}
                          placeholder="Укажите Ваши фамилию и имя" 
                          variant="outlined" InputLabelProps={{shrink: true}}
                          inputRef={register({
                            required: 'поля обязательное',
                            pattern: {
                              value: /^[А-Я][а-я]+\s[А-Я][а-я]+/,
                              message: "Вы неверно указали имя",
                            }
                          })}
                          helperText={errors.name && errors.name.message}
                        />

                      { medium && <Divider orientation="vertical" flexItem variant='middle'/>}
                    
                      { large &&
                          <AlternateEmailIcon className={classes.largeIcon}/>
                      }

                        <TextField fullWidth={!medium} margin={inputMargin} InputLabelProps={{shrink: true}}
                        id="outlined-required" label="E-mail" name='email'
                        error={errors.email}
                        placeholder="Ivanova@mail.ru" variant="outlined"
                        inputRef={register({
                          required: 'поля обязательное',
                          pattern: {
                            value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                            message: "Вы неверно указали имейл",
                          },
                        })}
                        helperText={errors.email && errors.email.message}
                        />

                      { medium && <Divider orientation="vertical" flexItem variant='middle'/> }

                      {large &&
                            <PhoneIcon className={classes.largeIcon}/>
                      }
                        <TextField fullWidth={!medium} margin={inputMargin} InputLabelProps={{shrink: true}}
                        id="outlined-required" label="Номер телефона" name='tele'
                        error={errors.tele}
                        placeholder="Укажите номер телефона" variant="outlined"
                        inputRef={register({
                          required: 'поля обязательное',
                          pattern: {
                            value: /^\+\d{11}$/,
                            message: "Вы неверно указали номер",
                          },
                        })}
                        helperText={errors.tele && errors.tele.message}
                        />
                
              </Grid>

                  
              <Box pt={4}>
                  <CustButton/>
              </Box>

              </form>

          </CardContent>
      </Card>
      </form>
    );
  }