import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import userDatas from './UserDatas';
import { useContext, useEffect } from 'react';
import { UserPriorityContext } from 'src/contexts/UserPriorityProvider';
import axios from 'axios';

import RecentOrdersTable from './UserDataTable';

function ApplicationsTransactions() {
  const {setPriority} = useContext(UserPriorityContext);

  // useEffect(() => {
  //   setPriority(1);
  // },[]) 

  const user = {
    name: 'Agent1',
    avatar: '/static/images/avatars/1.jpg'
  };

  const func1 = (userID) => {
    alert(userID);
  }
  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg" sx={{marginBottom:'30px'}}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrdersTable func1={func1} userDatas={userDatas}/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
