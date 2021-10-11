import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

interface WidgetListProps {
  title: string;
  children: any;
}
const usetheme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    padding: usetheme.spacing(2),
  },
}));
export default function Widget({ title, children }: WidgetListProps) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
}
