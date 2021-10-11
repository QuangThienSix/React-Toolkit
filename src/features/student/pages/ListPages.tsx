import { Button, Typography, Box, Pagination, LinearProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import StudentTable from '../components/StudentTable';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import StudentFilter from '../components/StudentFilter';
import { ListParams } from 'models';
import { Student } from 'models/student';
import studentApi from 'api/studentApi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

const usetheme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: usetheme.spacing(4),
  },
  loading: {
    position: 'absolute',
    padding: usetheme.spacing(-1),
    with: '100%',
  },
}));

export default function ListPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const match = useRouteMatch();

  const history = useHistory();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);

  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.fetchStundetList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    console.log(newFilter);
    dispatch(studentActions.setFilterWithDeBounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    console.log(newFilter);
    dispatch(studentActions.setFilter(newFilter));
  };
  const handleRemoveStudent = async (student: Student) => {
    console.log('remove: ', student);
    try {
      // remove API
      await studentApi.remove(student?.id || '');
      toast.success('Remove student successfully')
      // Trigger student List
      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {
      console.log('Failed Remove Student', error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Student</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add New Student
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <StudentFilter
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          filter={filter}
          cityList={cityList}
        />
      </Box>

      {/* Student Table */}
      <StudentTable
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
        cityMap={cityMap}
        studentList={studentList}
      />

      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination?._totalRows / pagination?._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
