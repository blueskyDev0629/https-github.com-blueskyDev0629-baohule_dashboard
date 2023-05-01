import {Helmet} from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {Container, Grid} from '@mui/material';

import DepositHistoryTable from './DepositHistoryTable';
import {useContext} from 'react';
import {UserPriorityContext} from 'src/contexts/UserPriorityProvider';

function GameManagement() {
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
            <DepositHistoryTable/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default GameManagement;
