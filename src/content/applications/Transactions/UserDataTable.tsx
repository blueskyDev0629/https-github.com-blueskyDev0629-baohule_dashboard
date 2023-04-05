import { FC, ChangeEvent, useState, useEffect, useRef } from 'react';
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
  CardHeader,
  TextField,
  Grid
} from '@mui/material';

import Label from 'src/components/Label';
import { UserData, AccountStatus } from 'src/models/crypto_order';
import { ArrowBack } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import TableDetails from './TableDetails';
import EditUserInfo from 'src/content/pages/Components/Modals/EditUserInfo';
import TopUpUser from 'src/content/pages/Components/Modals/TopUpUser';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
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
  userDatas: UserData[],
  page: number,
  limit: number
): UserData[] => {
  return userDatas.slice(page * limit, page * limit + limit);
};

const UserDataTable: FC<UserDataTableProps> = ({ userDatas, func1 }) => {
  const [selectedUserDatas, setSelectedUserDatas] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedUserDatas.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [userList, setUserList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState("username");
  const [detailDataID, setDetailDataID] = useState<string>();
  const [detailUserName, setDetailUserName] = useState<string>();

  const searchKey = useRef<HTMLInputElement>();

  useEffect(() => {
    getData();
  }, [page, limit]);

  const statusOptions = [
    {
      id: 'username',
      name: 'User name'
    },
    {
      id: 'email',
      name: 'Email'
    }
  ];


  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    getData()
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    getData()
  };

  const createDataTemplate = (email, username, id, balance, updatedAt, createdAt) => {
    return {email, username, id, balance, updatedAt, createdAt};
  }

  const getData = async() => {
    const requestBody = JSON.stringify({
      "context": {
        "filter": {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      },
      "params": {
        "page": page+1,
        "size": limit
      }
    });
    const customConfig = {
      headers: {
        'Authorization': 'Bearer JWT 1337H4X',
        'Content-Type': 'application/json'
      }
    };
    const result = await axios.post('http://193.149.176.137:8000/api/user/list_all_users', requestBody, customConfig);
    let data = [];
    for(let index = 0; index < result.data.response.items.length; index++) {
      const tempData = createDataTemplate(
        result.data.response.items[index].email,
        result.data.response.items[index].username,
        result.data.response.items[index].id,
        result.data.response.items[index].creditAccount?.balance,
        result.data.response.items[index].updatedAt,
        result.data.response.items[index].createdAt,
      );
      data.push(tempData);
    }
    setUserList(data);
    setTotalCount(result.data.response.total);
  }

  const getFilterData = async() => {
    if(searchKey.current) {
      console.log(typeof(filters), typeof(searchKey.current.value));
    }
    let requestBody;
    if(filters == 'username') {
      requestBody = JSON.stringify({
        "username": searchKey.current.value,
        "type": "user"
      });
    }else if(filters == 'email') {
      requestBody = JSON.stringify({
        "email": searchKey.current.value,
        "type": "user"
      });
    }
    const customConfig = {
      headers: {
        'Authorization': 'Bearer JWT 1337H4X',
        'Content-Type': 'application/json'
      }
    };
  
    const result = await axios.post('http://193.149.176.137:8000/api/admin/search', requestBody, customConfig);
    // setAgentList(result.data.response.items);
    let data = [];
    if(!result.data.response) {
      NotificationManager.warning(`Please try another.`, "No matches!")
    }
    else {
      for(let index = 0; index < result.data.response.length; index++) {
        const tempData = createDataTemplate(
          result.data.response[index].email,
          result.data.response[index].username,
          result.data.response[index].id,
          result.data.response[index].creditAccount?.balance,
          result.data.response[index].updatedAt,
          result.data.response[index].createdAt,
          )
          data.push(tempData);
      }
      setUserList(data);
      setTotalCount(result.data.response.length);
    }
  }

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters(value);
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
  const selectedSomeUserDatas =
    selectedUserDatas.length > 0 &&
    selectedUserDatas.length < userDatas.length;
  const selectedAllUserDatas =
    selectedUserDatas.length === userDatas.length;
  const theme = useTheme();

  const handleBack = () => {
    setDetailDataID(""); 
  }
  const searchKeyChanged = () => {
    if(!searchKey.current.value) getData();
  }

  const getDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString();
  }

  return (
    <>
    {detailDataID?(
      <Box sx={{marginBottom:'30px'}}>
        <Box textAlign='right'>
          <Button
            sx={{ mt: { xs: 2, md: 0 }, alignSelf:'right' }}
            variant="contained"
            startIcon={<ArrowBack fontSize="small" />}
            onClick={handleBack}
          >
            Back To Main List
          </Button>
        </Box>
        <Card sx={{marginTop:"20px"}}>
          <TableDetails userID={detailDataID} userName={detailUserName} />
        </Card>
      </Box>
    ):(
        <Card sx={{marginBottom:'30px'}}>
            <CardHeader
              action={
                <Grid container spacing={2}>
                  <Grid item xs={5} sm={4}>
                    <Box width={150}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Filter</InputLabel>
                        <Select
                          onChange={handleStatusChange}
                          defaultValue={statusOptions[0].id}
                          label="Filter"
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
                  </Grid>
                  <Grid item xs={12} sm={8} sx={{display:'flex'}}>
                    <TextField
                          id="outlined-search"
                          label="Search"
                          type="search"
                          inputRef={searchKey}
                          onChange={searchKeyChanged}
                        />
                    <Button
                        sx={{ 
                          marginLeft: "0.25rem", 
                          padding:"5px" 
                        }}
                        onClick={getFilterData}
                      >
                        <SearchIcon sx={{fontSize:"40px"}}/>
                    </Button>
                  </Grid>
                </Grid>
              }
            />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Avatar</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">User Name</TableCell>
                  <TableCell align="center">User ID</TableCell>
                  <TableCell align="center">Credit</TableCell>
                  <TableCell align="center">Last TopUp</TableCell>
                  <TableCell align="center">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((userData) => {
                  const isUserDataSelected = selectedUserDatas.includes(
                    userData.id
                  );
                  return (
                    <TableRow
                      hover
                      sx={{cursor:'pointer'}}
                      key={userData.id}
                      selected={isUserDataSelected}
                      onClick={() => navigateToDetails(userData.id, userData["username"])}
                    >
                      <TableCell align='center'>
                        <img src="https://img.icons8.com/fluency/48/null/user-male-circle.png"/>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {ellipseText(userData["email"])}
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
                          {ellipseText(userData["username"])}
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
                          {ellipseText(userData.id)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {userData["balance"]}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {getDate(userData["updatedAt"])}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getDate(userData["createdAt"])}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
    )}
    </>
  );
};

UserDataTable.propTypes = {
  userDatas: PropTypes.array.isRequired
};

UserDataTable.defaultProps = {
  userDatas: []
};

export default UserDataTable;
