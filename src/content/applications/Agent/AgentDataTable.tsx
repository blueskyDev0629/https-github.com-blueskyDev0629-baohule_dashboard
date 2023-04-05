import { FC, ChangeEvent, useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
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
import SearchIcon from '@mui/icons-material/Search';
import { ellipseText } from 'src/library/DataItemLib';
import Label from 'src/components/Label';
import { AgentData, FiterType, AccountStatus } from 'src/models/crypto_order';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import Buttons from 'src/content/pages/Components/Buttons';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


interface agentDataTableProps {
  className?: string;
  func1: Function;
}

interface FilterTypes {
  types?: FiterType;
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


const AgentDataTable: FC<agentDataTableProps> = ({ func1 }) => {
  const [selectedUserDatas, setSelectedUserDatas] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedUserDatas.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const [filterTypes, setFilterTypes] = useState("username");
  const [filterContent, setFilterContent] = useState<string>('');

  const [agentList, setAgentList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const searchKey = useRef<HTMLInputElement>();

  const createDataTemplate = (
    id, username, email, quota, createdAt, updatedAt, active
  ) => {
    return {id, username, email, quota, createdAt, updatedAt, active}
  }

  const getData = async() => {
    const requestBody = JSON.stringify({
      "context": {
        "filter": {
          "additionalProp1": "2419bc79-61aa-4b07-82a7-4f6bc9e989da",
          "additionalProp2": "2419bc79-61aa-4b07-82a7-4f6bc9e989da",
          "additionalProp3": "2419bc79-61aa-4b07-82a7-4f6bc9e989da"
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
  
    const result = await axios.post('http://193.149.176.137:8000/api/agent/list_agents', requestBody, customConfig);
    let data = [];
    for(let index = 0; index < result.data.response.items.length; index++) {
      const tempData = createDataTemplate(
        result.data.response.items[index].id,
        result.data.response.items[index].username,
        result.data.response.items[index].email,
        result.data.response.items[index].quota,
        result.data.response.items[index].createdAt,
        result.data.response.items[index].updatedAt,
        result.data.response.items[index].active,
      )
      data.push(tempData);
    }
    setAgentList(data);
    setTotalCount(result.data.response.total);
  }
 
  const getFilterData = async() => {
    if(searchKey.current) {
      console.log(typeof(filterTypes), typeof(searchKey.current.value));
    }
    let requestBody;
    if(filterTypes == 'username') {
      requestBody = JSON.stringify({
        "username": searchKey.current.value,
        "type": "agent"
      });
    }else if(filterTypes == 'email') {
      requestBody = JSON.stringify({
        "email": searchKey.current.value,
        "type": "agent"
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
      NotificationManager.warning(`Please try another.`, "No matches!");
    } else {
      for(let index = 0; index < result.data.response.length; index++) {
        const tempData = createDataTemplate(
          result.data.response[index].id,
          result.data.response[index].username,
          result.data.response[index].email,
          result.data.response[index].quota,
          result.data.response[index].createdAt,
          result.data.response[index].updatedAt,
          result.data.response[index].active
          )
          data.push(tempData);
      }
      setAgentList(data);
      setTotalCount(result.data.response.length);
    }
  }

  const getDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString();
  }

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

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilterTypes(value);
    console.log("filter type ===> ", value)
  };

  const searchKeyChanged = () => {
    if(!searchKey.current.value) getData();
  }

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  return (
    <>
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
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  {/* <TableCell align="center">Password</TableCell> */}
                  <TableCell align="center">Email</TableCell>
                  {/* <TableCell align="center">AccessToken</TableCell>
                  <TableCell align="center">AdminId</TableCell> */}
                  <TableCell align="center">Quota</TableCell>
                  <TableCell align="center">CreatAt</TableCell>
                  <TableCell align="center">UpdateAt</TableCell>
                  <TableCell align='center'>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agentList.map((userData) => {
                  const isUserDataSelected = selectedUserDatas.includes(
                    userData.id
                  );
                  return (
                    <TableRow
                      hover
                      sx={{cursor:'pointer'}}
                      key={userData.id}
                      selected={isUserDataSelected}
                      // onClick={() => navigateToDetails(userData.id)}
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
                          {ellipseText(userData.username)}
                        </Typography>
                      </TableCell>
                      {/* <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {ellipseText(userData.password)}
                        </Typography>
                      </TableCell> */}
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {ellipseText(userData.email)}
                        </Typography>
                      </TableCell>
                      {/* <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {ellipseText(userData.accessToken)}
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
                          {ellipseText(userData.adminId)}
                        </Typography>
                      </TableCell> */}
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData.quota}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {getDate(userData["createdAt"])}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getDate(userData["updatedAt"])}
                      </TableCell>
                      <TableCell align="center">
                        {userData.active? (
                          <>
                            {getStatusLabel("active")}
                          </>):(
                            <>
                            {getStatusLabel("disabled")}
                            </>
                          )}
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
    
    </>
  );
};

export default AgentDataTable;
