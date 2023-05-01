import { useRoutes, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import router from 'src/router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import AdminDashboard from './content/applications/AdminDashboard';
import { UserPriorityContext } from 'src/contexts/UserPriorityProvider';
import AgentManagement from './content/applications/Agent';
import UserManagement from './content/applications/Transactions';
import DepositRequest from './content/applications/DepositRequest';
import WithDrawalRequest from './content/applications/WithdrawalsRequest';
import DepositHistory from './content/applications/DeopsitHistory';
import WithdrawalHistory from './content/applications/WithdrawalHistory';
function Main(props:{type:string}) {
  const content = useRoutes(router);
  const {userPriority} = useContext(UserPriorityContext);

  return (
    <>
    {props.type=="admin"?(
        <SidebarLayout type="admin">
        <Routes>
            <Route path='/dashboard' element={<AdminDashboard/>}/>
            <Route path='/request/depositrequest' element={<DepositRequest/>}/>
            <Route path='/request/withdrawalrequest' element={<WithDrawalRequest/>}/>
            <Route path='/management/agents' element={<AgentManagement/>}/>
            <Route path='/management/users' element={<UserManagement/>}/>
            <Route path='/management/deposithistory' element={<DepositHistory/>}/>
            <Route path='/management/withdrawalhistory' element={<WithdrawalHistory/>}/>
            <Route path='*' element={<Navigate to={'/admin/app/dashboard'} />} />
        </Routes>
        </SidebarLayout>
    ):(
        <SidebarLayout type="agent">
          <Routes>
            <Route path='/request/depositrequest' element={<DepositRequest/>}/>
            <Route path='/request/withdrawalrequest' element={<WithDrawalRequest/>}/>
            <Route path='/management/users' element={<UserManagement/>}/>
            <Route path='/management/deposithistory' element={<DepositHistory/>}/>
            <Route path='/management/withdrawalhistory' element={<WithdrawalHistory/>}/>
            <Route path='*' element={<Navigate to={'/agent/app/management/users'} />} />
          </Routes>        
        </SidebarLayout>
    )}
    </>
  );
}
export default Main;
