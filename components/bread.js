import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Box } from '@material-ui/core';

import { mediaProps } from '../helpers/functions'

export const Breadcrumb = ({size}) =>
{
  const variant = mediaProps(size, 'subtitle1', 'body1', 'body2', 'body2')

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
