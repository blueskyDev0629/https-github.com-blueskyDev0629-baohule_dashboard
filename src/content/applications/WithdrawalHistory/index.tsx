import {Helmet} from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {Container, Grid} from '@mui/material';

import WithdrawalHistoryTable from './WithdrawalHistoryTable';
import {useContext} from 'react';
import {UserPriorityContext} from 'src/contexts/UserPriorityProvider';

function WithdrawalHistory() {
  const { setPriority } = useContext(UserPriorityContext); 
  // useEffect(() => {
  //   setPriority(0);
  // },[]);

  const user = {
    name: 'Agent1',
    avatar: '/static/images/avatars/1.jpg'
  };
  const func1 = (userID) => {
    alert(userID);
  }
  // @ts-ignore
    return (
    <>
      <Helmet>
        <title>Agent - Applications</title>
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
            <WithdrawalHistoryTable func1={func1}/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default WithdrawalHistory;
