import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Divider, Box, TextField, Grid, CardHeader, Button, Typography } from '@material-ui/core';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';

import { useForm } from 'react-hook-form';
import * as actionTypes from '../states/actions'
import {mediaProps} from '../helpers/functions'

export const Form = ({size, dispatch}) => {
    const classes = useStyles();
    
    const {register, handleSubmit, errors} = useForm()

    /*
    **size adjustment
    */

    const {
          medium,
          large,
          inputMargin,
        } = {
              medium: false,
              large: false,
              inputMargin: 'normal',
              ...mediaProps(size, largeProp, mediumProp, {}, iphoneProp)
            }

    const direction = medium ? 'row' : 'column';
    const mTop = medium ? 0 : 2;
    const outerStyling = !medium ? {paddingRight: 20, paddingLeft: 20 } : {}
    
    /*
    **
    */
  
    const save = (data) => {
      dispatch({
        type: actionTypes.INITIATE_SAVING,
        payload: {...data},
      })
    }
    return (
      <form onSubmit={handleSubmit(save)}>
      <Card>
          <CardHeader></CardHeader>
          <CardContent>
              <div style = {outerStyling}>
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
                                        })
                                      }
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
                                          })
                                        }
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
                                          })
                                      }
                        helperText={errors.tele && errors.tele.message}
                        />
                
              </Grid>

                  
              <Box pt={4} display="flex" justifyContent="center">
                  <Button variant="contained" color="primary" size='large' type='submit'>
                    <Typography  variant='caption'>
                      Сохранить изменения
                    </Typography>
                  </Button>
              </Box>

              </div>

          </CardContent>
      </Card>
      </form>
    );
  }

const useStyles = makeStyles({
  largeIcon: {
    transform: 'scale(1.5)',
  },
});

const largeProp = {
  large: true,
  medium: true,
}

const mediumProp = {
  medium: true,
  direction: 'row',
}

const iphoneProp = {
  inputMargin: 'dense'
}

