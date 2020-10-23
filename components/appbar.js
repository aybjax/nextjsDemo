import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Divider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import { nameInitials, mediaProps } from '../helpers/functions'

export const Appbar = ({name, size}) => {
  const classes = useStyles();
    
    /*
    ** size adjustment
    */

    const {fontSize, variant} = mediaProps(size, large, medium, others, others,)

    /*
    **
    */
   
  return (
    <div className={classes.grow}>
      <AppBar position="static" color='transparent' style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar justify='end' padding={5}>
          <div className={classes.grow} />
          <IconButton color="inherit">
              <NotificationsNoneIcon style={{ color: '#fff' }} fontSize={fontSize}/>
          </IconButton>
          <Divider orientation="vertical" flexItem light variant='fullWidth' />
          <IconButton>
            <AccountCircle fontSize={fontSize} color='action'/>
          </IconButton>
          <Typography variant={variant} noWrap display='block' align='center' color='secondary'>
            {nameInitials(name)}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justify: 'center',

    },
  },
}));


const large = {
  fontSize: 'large',
  variant: 'subtitle1'
}

const medium = {
  fontSize: 'inherit',
  variant: 'body1'
}

const others = {
  fontSize: 'small',
  variant: 'body2'
}