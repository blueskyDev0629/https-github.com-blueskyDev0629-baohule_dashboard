import { useRoutes, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { Box, CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import {NotificationContainer} from 'react-notifications';
import SignIn from './content/SignIn';
import { ConfirmProvider } from "material-ui-confirm";
import Main from 'src/Main'


function App() {

  return (
      <ThemeProvider>
        <ConfirmProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
                <Routes>
                  <Route path='/' element={<Navigate to='/admin'/>}/>
                  <Route path='/admin' element={<SignIn admin={true} agent={false}/>}/>
                  <Route path='/agent' element={<SignIn admin={false} agent={true}/>}/>
                  <Route path='/admin/app/*' element={<Main type="admin"/>} />
                  <Route path='/agent/app/*' element={<Main type="agent"/>} />
                </Routes>
          </LocalizationProvider>
          <NotificationContainer/>
        </ConfirmProvider>
      </ThemeProvider>
  );
}
export default App;
