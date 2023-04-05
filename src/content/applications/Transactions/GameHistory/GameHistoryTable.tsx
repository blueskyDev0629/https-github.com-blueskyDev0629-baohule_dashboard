import { FC, ChangeEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { UserData, AccountStatus } from 'src/models/crypto_order';
import { ArrowBack } from '@mui/icons-material';
import EditUserInfo from 'src/content/pages/Components/Modals/EditUserInfo';
import TopUpUser from 'src/content/pages/Components/Modals/TopUpUser';
import { ellipseText } from 'src/library/DataItemLib';

interface UserDataTableProps {
  className?: string;
  userDatas: UserData[];
  func1: Function;
}

interface Filters {
  status?: AccountStatus;
}

interface Props {
  func1:() => void;
}

const getStatusLabel = (accountStatus: AccountStatus): JSX.Element => {
  const map = {
    disabled: {
      text: 'Disabled',
      color: 'error'
    },
    active: {
      text: 'Active',
      color: 'success'
    }
  };

  const { text, color }: any = map[accountStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  userDatas: UserData[],
  filters: Filters
): UserData[] => {
  return userDatas.filter((userData) => {
    let matches = true;

    if (filters.status && userData.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};


const applyPagination = (
  userDatas:any,
  page: number,
  limit: number
) => {
  return userDatas.slice(page * limit, page * limit + limit);
};

const GameHistoryTable= (props:{userID:string}) => {
  const [selectedUserDatas, setSelectedUserDatas] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedUserDatas.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [userList, setUserList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [detailDataID, setDetailDataID] = useState<string>();
  const [detailUserName, setDetailUserName] = useState<string>();

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'active',
      name: 'Active'
    },
    {
      id: 'disabled',
      name: 'Disabled'
    }
  ];

  useEffect(() => {
    getData();
  }, [page, limit]);


  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const getData = async() => {
    const requestBody = JSON.stringify({
      "ownerId": props.userID
    });
    const customConfig = {
      headers: {
        'Authorization': 'Bearer JWT 1337H4X',
        'Content-Type': 'application/json'
      }
    };
    const result = await axios.post('http://193.149.176.137:8000/api/history/get_bet_history', requestBody, customConfig);
    setUserList(result.data.response);
    setTotalCount(result.data.response.length);
  }

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const navigateToDetails = (id, userName) => {
    setDetailDataID(id);
    setDetailUserName(userName);
  }

  // const filteredUserDatas = applyFilters(userDatas, filters);
  const paginatedUserDatas = applyPagination(
    userList,
    page,
    limit
  );
  const handleBack = () => {
    setDetailDataID(""); 
  }

  const getDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString();
  }

  return (
    <Card sx={{marginBottom:'30px'}}>
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="User Data"
        />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Game ID</TableCell>
              <TableCell align="center">Before Score</TableCell>
              <TableCell align="center">Bet Score</TableCell>
              <TableCell align="center">New Score</TableCell>
              <TableCell align="center">Win Score</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUserDatas?(
              <>
                {paginatedUserDatas.map((userData) => {
                  const isUserDataSelected = selectedUserDatas.includes(
                    userData.id
                  );
                  return (
                    <TableRow
                      hover
                      sx={{cursor:'pointer'}}
                      key={userData.id}
                    >
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {ellipseText(userData.id)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData["game"]?.id}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData["beforeScore"]}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData["betScore"]}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData["newScore"]}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData["winScore"]}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {getDate(userData["createdAt"])}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getDate(userData["updateAt"])}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            ):(<></>)}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={totalCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default GameHistoryTable;
