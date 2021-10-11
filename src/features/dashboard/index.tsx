import { ChairTwoTone, LinearScale, PeopleAlt } from '@mui/icons-material';
import { Grid, LinearProgress, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/statisticItem';
import {
  dashboardAction,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowMarkStudentList,
  selectRankingByCityList,
} from './dashboardSlice';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';

const usetheme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    paddingTop: usetheme.spacing(1),
  },
  loading: {
    position: 'absolute',
    padding: usetheme.spacing(-1),
    with: '100%',
  },
}));

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowMarkStudentList = useAppSelector(selectLowMarkStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  const classes = useStyles();

  useEffect(() => {
    dispatch(dashboardAction.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary"></PeopleAlt>}
            label="male"
            value={statistics.maleCount}
          ></StatisticItem>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary"></PeopleAlt>}
            label="female"
            value={statistics.femaleCount}
          ></StatisticItem>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChairTwoTone fontSize="large" color="primary"></ChairTwoTone>}
            label="mark >= 8"
            value={statistics.hightMarkCount}
          ></StatisticItem>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<LinearScale fontSize="large" color="primary"></LinearScale>}
            label="mark <=5"
            value={statistics.lowMarkCount}
          ></StatisticItem>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h4"> ALl Student</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList}></StudentRankingList>
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowMarkStudentList}></StudentRankingList>
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box mt={5}>
        <Typography variant="h4">Ranking By City</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={`TP. ${ranking.cityName}`}>
                  <StudentRankingList studentList={ranking.rankingList}></StudentRankingList>
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
