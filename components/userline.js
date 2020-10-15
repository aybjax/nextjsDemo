import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import { Box, Grid, Paper, Typography, IconButton } from '@material-ui/core';

import { SMALL, MEDIUM, IPHONE } from '../helpers/constants';


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

  const medium = size !== IPHONE;

  /*
  ** size adjustment by screen
  */
  let variant;
  let margLeft;
  let closeVar
  if(size === IPHONE)
  {
    margLeft=0
    variant = 'subtitle2'
    closeVar = 'caption'
  }
  else if( size === SMALL )
  {
    margLeft=1
    variant = 'body1'
    closeVar = 'caption'
  }
  else if( size === MEDIUM )
  {
    margLeft=2
    variant = 'h5'
    closeVar = 'overline'
  }
  else
  {
    margLeft=3
    variant = 'h4'
    closeVar = 'button'
  }
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
              {info.name}
            </Typography>
          </Box>
      
          {/* button */}
          <Box>
            <IconButton className={classes.padding} onClick={ ()=> setIsRead(mode=>!mode) }>
              {/* if any size other than smallest */}
              {medium &&
                <Box mr={2}>
                  <Typography variant={closeVar} noWrap display='block' align='center'>
                      {isRead ? 'Редактировать' : "закрыть"}
                  </Typography>
                </Box>
              }

              {
                isRead ? 
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