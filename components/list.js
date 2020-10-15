import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { Divider, Paper, Typography } from '@material-ui/core';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';

import { SMALL, MEDIUM, IPHONE } from '../helpers/constants';

import {parseTel} from '../helpers/functions';

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


export const CustList = ({size, info}) =>
{
    const classes = useStyles();
    const mTop = 2;

    /*
    **size adjustment
    */
    let variant;
    let iconSize;
    if(size === IPHONE)
    {
      variant = 'subtitle2'
      iconSize = 'smallIcon'
    }
    else if( size === SMALL )
    {
      variant = 'subtitle1'
      iconSize = 'mediumIcon'
    }
    else if( size === MEDIUM )
    {
      variant = 'h6'
      iconSize = 'largeIcon'
    }
    else
    {
      variant = 'h5'
      iconSize = 'largeIcon'
    }
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
                        {info.email}
                      </Typography>
                </ListItem>

                <Divider/>
                
                <ListItem>
                      <IconButton className={classes[iconSize], classes.padding, classes.kick}>
                        <PhoneIcon className={classes[iconSize]}/>
                      </IconButton>

                      <Typography variant={variant} style={{color: 'black'}}>
                        {parseTel(info.tele)}
                      </Typography>
                </ListItem>
            </List>
        </Paper>
        
    );
}