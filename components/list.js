import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { Divider, Paper, Typography } from '@material-ui/core';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';

import {parseTel, mediaProps} from '../helpers/functions';

export const CustList = ({state, size}) =>
{
    const classes = useStyles();

    /*
    **size adjustment
    */
   
    const {
            variant,
            iconSize
          } = mediaProps(size, large, medium, small, iphone)
    /*
    **
    */

    return (
        <Paper>
            <List>
                <ListItem>
                      <IconButton className={classes[iconSize], classes.padding, classes.kick}>
                        <AlternateEmailIcon className={classes[iconSize]}/>
                      </IconButton>

                      <Typography variant={variant} style={{color: 'black'}}>
                        {state.email}
                      </Typography>
                </ListItem>

                <Divider/>
                
                <ListItem>
                      <IconButton className={classes[iconSize], classes.padding, classes.kick}>
                        <PhoneIcon className={classes[iconSize]}/>
                      </IconButton>

                      <Typography variant={variant} style={{color: 'black'}}>
                        {parseTel(state.tele)}
                      </Typography>
                </ListItem>
            </List>
        </Paper>
        
    );
}


const useStyles = makeStyles({
  largeIcon: {
    transform: 'scale(1.5)',
  },
  mediumIcon: {
    transform: 'scale(1.2)',
  },
  smallIcon: {
    transform: 'scale(1)',
  },
  padding: {
    padding: 5,
  },

  kick: {
    marginRight: 10,
  }
});

const large = {
variant: 'h5',
iconSize: 'largeIcon',
}

const medium = {
variant: 'h6',
iconSize: 'largeIcon',
}

const small = {
variant: 'subtitle1',
iconSize: 'mediumIcon',
}

const iphone = {
variant: 'subtitle2',
iconSize: 'smallIcon',
}
