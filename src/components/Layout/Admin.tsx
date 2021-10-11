import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Header } from 'components/common';
import Sidebar from 'components/common/Sidebar';
import Dashboard from 'features/dashboard/index';
import StudentFeature from 'features/student';
// import Users from 'features/users';

const usetheme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '200px 1fr',
    gridTemplateAreas: '"header header" "sidebar main"',

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  main: {
    gridArea: 'main',
    backgroundColor: usetheme.palette.background.paper,
    padding: usetheme.spacing(2, 3),
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${usetheme.palette.divider}`,
    backgroundColor: usetheme.palette.background.paper,
  },
}));

export function AdminLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>

      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>

          <Route path="/admin/students">
            <StudentFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
