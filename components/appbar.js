import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {
  SMALL,
  MEDIUM,
} from '../helpers/constants';
import {nameInitials} from '../helpers/functions'


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

export const Appbar = ({size, info}) => {
  const classes = useStyles();
    let fontSize;
    let variant;

    if( size === SMALL )
    {
      fontSize = 'small'
      variant = 'body2'
    }
    else if( size === MEDIUM )
    {
      fontSize = 'inherit'
      variant = 'body1'
    }
    else
    {
      fontSize = 'large'
      variant = 'subtitle1'
    }
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
            {nameInitials(info.name)}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}