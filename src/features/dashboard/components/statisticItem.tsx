/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Paper, Typography, Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: usetheme.spacing(2),
    border: `1px solid ${usetheme.palette.divider}`,
  },
}));

const usetheme = createTheme();

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value?: string | number;
}

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>

      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
