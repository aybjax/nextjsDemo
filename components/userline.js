import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import { Box, Grid, Paper, Typography, IconButton } from '@material-ui/core';

import { IPHONE } from '../helpers/constants';
import {mediaProps} from '../helpers/functions'

import * as actionTypes from '../states/actions';


// export const UserLine = ({size, isRead, setIsRead, info}) => {
export const UserLine = ({size, state, dispatch}) => {
  const classes = useStyles();

  const medium = size !== IPHONE;

  /*
  ** size adjustment by screen
  */

  const {
        variant,
        margLeft,
        closeVar
      } = mediaProps(size, large, medium, small, iphone)
  /*
  **
  */

  return (
    <Box mb={4}>
      <Paper className={classes.root} style={{backgroundColor: '#1A78C2'}}>
        <Grid container direction="row" alignItems="center">
          
          {/* Avatar */}
          <Box ml={margLeft}>
            <IconButton className={classes.largeIcon, classes.padding}>
              <AccountCircle className={classes.largeIcon} color='action'/>
            </IconButton>
          </Box>
      
          {/* Full name */}
          <Box ml={margLeft} className={classes.kick} component="div" overflow="hidden">
            <Typography variant={variant} className={classes.title, classes.padding}>
              {state.name}
            </Typography>
          </Box>
      
          {/* button */}
          <Box>
            <IconButton className={classes.padding} onClick={ ()=> dispatch({type:actionTypes.TOGGLE_READ_MODE}) }>
              {/* if any size other than smallest */}
              {medium &&
                <Box mr={2}>
                  <Typography variant={closeVar} noWrap display='block' align='center'>
                      {state.isRead ? 'Редактировать' : "закрыть"}
                  </Typography>
                </Box>
              }

              {
                state.isRead ? 
                <CreateIcon color='secondary' fontSize='small'/>
                :
                <CloseIcon color='secondary' fontSize='small'/>
              }
              
            </IconButton>
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
}


const useStyles = makeStyles({
  largeIcon: {
    transform: 'scale(1.5)',
  },
  root: {
    minWidth: 275,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    flexGrow: 1,
  },
  padding: {
    padding: 5,
  },
  kick: {
    flexGrow: 1,
  }
});

const large = {
  margLeft: 3,
  variant: 'h4',
  closeVar: 'button',
}
const medium = {
  margLeft: 2,
  variant: 'h5',
  closeVar: 'overline',
}
const small = {
  margLeft: 1,
  variant: 'body1',
  closeVar: 'caption',
}
const iphone = {
  margLeft: 0,
  variant: 'subtitle2',
  closeVar: 'caption',
}

