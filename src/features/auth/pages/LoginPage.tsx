import React from 'react';
import { Box, Button, CircularProgress, createTheme, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from '../authSlice';
import { useHistory } from 'react-router-dom';

const usetheme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: usetheme.spacing(2),
  },
}));

export default function LoginPage() {


  const history = useHistory();
  const token = localStorage.getItem('access_token');
  if(token){history.push('/admin/dashboard')}

  
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const isLogging = useAppSelector((state) => state.auth.logging);
  console.log(isLogging);

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: '123',
        password: '234',
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          ID:
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size="20" color="secondary" />} Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
