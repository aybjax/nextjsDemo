import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core';

import {
  SMALL,
  MEDIUM,
  LARGE,
} from '../helpers/constants';


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

export const UserLine = ({size, isRead, setIsRead, info}) => {
  const classes = useStyles();

  const medium = size === MEDIUM || size === LARGE;

  let variant;
  let margLeft;

  if( size === SMALL )
  {
    margLeft=0
    variant = 'subtitle2'
  }
  else if( size === MEDIUM )
  {
    margLeft=1
    variant = 'body1'
  }
  else
  {
    margLeft=2
    variant = 'h5'
  }

  let closeVar
  if( size === LARGE ) closeVar = 'button'
  else closeVar = 'caption'


  return (
    <Box mb={4}>
      <Paper className={classes.root} style={{backgroundColor: '#1A78C2'}}>
        <Grid container direction="row" alignItems="center">
          
          <Box ml={margLeft}>
            <IconButton className={classes.largeIcon, classes.padding}>
              <AccountCircle className={classes.largeIcon} color='action'/>
            </IconButton>
          </Box>
      
      
          <Box ml={margLeft} className={classes.kick} component="div" overflow="hidden">
            <Typography variant={variant} className={classes.title, classes.padding}>
              {info.name}
            </Typography>
          </Box>
      
      
          <Box>
          {isRead ?
            <>
              <IconButton className={classes.padding} onClick={ ()=> setIsRead(mode=>!mode) }>
                {medium && <Box mr={2}>
                  <Typography variant={closeVar} noWrap display='block' align='center'>
                      Редактировать
                  </Typography>
                </Box>}
                <CreateIcon color='secondary' fontSize='small'/>
              </IconButton>
            </> :
            <IconButton className={classes.padding} onClick={ ()=> setIsRead(mode=>!mode) }>
              {medium && <Box mr={2}>
                <Typography variant={closeVar} noWrap display='block' align='center'>
                    закрыть
                </Typography>
              </Box>}
              <CloseIcon color='secondary' fontSize='small'/>
            </IconButton>
          }
          </Box>
        </Grid>
    </Paper>
    </Box>
  );
}