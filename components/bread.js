import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Box } from '@material-ui/core';

import { MEDIUM, LARGE } from '../helpers/constants'

export const Breadcrumb = ({size}) =>
{
  let variant;
  if( size === LARGE ) variant = 'subtitle1'
  else if( size === MEDIUM ) variant = 'body1'
  else variant = 'body2'

  return (
    <Box mb={4}>
      <Breadcrumbs color='secondary' aria-label="breadcrumb">
        <Link href="/" onClick={(e)=>e.preventDefault()}>
          <Typography variant={variant}>Главная</Typography>
        </Link>
        <Link href="/getting-started/installation/" onClick={(e)=>e.preventDefault()}>
          <Typography variant={variant}>Личный профиль</Typography>
        </Link>
      </Breadcrumbs>
    </Box>
);
}
