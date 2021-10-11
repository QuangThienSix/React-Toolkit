import { Search } from '@mui/icons-material';
import { Box, Button, Grid, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { City, ListParams } from 'models';
import React, { ChangeEvent } from 'react';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilter({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: StudentFilterProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  const handleCityChange = (e: { target: { value: any } }) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      city: e.target.value || undefined,
      _page: 1,
    };
    onChange(newFilter);
  };

  const handleSortChange = (e: { target: { value: any } }) => {
    if (!onChange) return;
    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ m: 1 }} variant="standard" size="small">
            <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
            <Input
              defaultValue={filter.name_like}
              id="searchByName"
              endAdornment={<Search />}
              onChange={handleSearchChange}
            />
          </FormControl>
        </Grid>
        {/* Filter */}
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="standard" sx={{ m: 1 }} size="small" fullWidth>
            <InputLabel id="filterByCity">Filter By City</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="Filter By City"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="standard" sx={{ m: 1 }} size="small" fullWidth>
            <InputLabel id="filterByCity">Sort</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>No Sort</em>
              </MenuItem>

              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">MARK ASC</MenuItem>
              <MenuItem value="mark.desc">MARK DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1} m={'auto'}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
