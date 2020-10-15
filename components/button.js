import React from 'react';
import Button from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';


export const CustButton = (props) => (
    <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" size='large' type='submit'>
          <Typography  variant='caption'>
            Сохранить изменения
          </Typography>
        </Button>
    </Box>
  )