import { useContext } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Typography,
  Divider
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AddUserModal from 'src/content/pages/Components/Modals/AddUser';
import EditUserInfo from 'src/content/pages/Components/Modals/EditUserInfo';
import TopUpUser from 'src/content/pages/Components/Modals/TopUpUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { UserPriorityContext } from 'src/contexts/UserPriorityProvider';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const { userPriority } = useContext(UserPriorityContext)

  console.log(userPriority);
  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div" sx={{marginTop: '12px', marginBottom: '15px'}}>
                {window.localStorage.getItem("priority")=="admin"?(
                  <ListSubheader component="div" style={{fontSize:'1.25rem', color:'white'}} disableSticky>
                    Admin Dashboard
                  </ListSubheader>
                ):(
                  <ListSubheader component="div" style={{fontSize:'1.25rem', color:'white'}} disableSticky>
                    Agent Dashboard
                  </ListSubheader>
                )}
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        {window.localStorage.getItem("priority")=="admin"?(
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Admin
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/admin/dashboard"
                    startIcon={<TableChartTwoToneIcon />}
                  >
                    Dashboard
                  </Button>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </List>
        ):(<></>)}
        
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Management
            </ListSubheader>
          }
        >
          {window.localStorage.getItem("priority")=="admin"?(
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/admin/agent"
                    startIcon={<SupportAgentIcon />}
                  >
                    Agent Management
                  </Button>
                </ListItem>
              </List>
            </SubMenuWrapper>
          ):(
            <></>
          )}
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/transactions"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  User Management
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
          {window.localStorage.getItem("priority")=="admin"?(
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/admin/game"
                    startIcon={<SportsEsportsIcon />}
                  >
                    Game Management
                  </Button>
                </ListItem>
              </List>
            </SubMenuWrapper>
          ):(
            <></>
          )}
        </List>

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Components
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div"> 
                <AddUserModal/>
              </ListItem>
              <ListItem component="div">
                <EditUserInfo/>
              </ListItem>
              <ListItem component="div">
                <TopUpUser/>
              </ListItem>
              {/* <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/tabs"
                  startIcon={<FilterVintageTwoToneIcon />}
                >
                  Tabs
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/badges"
                  startIcon={<HowToVoteTwoToneIcon />}
                >
                  Badges
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/tooltips"
                  startIcon={<LocalPharmacyTwoToneIcon />}
                >
                  Tooltips
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/avatars"
                  startIcon={<RedeemTwoToneIcon />}
                >
                  Avatars
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/cards"
                  startIcon={<SettingsTwoToneIcon />}
                >
                  Cards
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/forms"
                  startIcon={<TrafficTwoToneIcon />}
                >
                  Forms
                </Button>
        </ListItem> */}
        {/* <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/buttons"
                  startIcon={<HowToVoteTwoToneIcon />}
                >
                  Badges
                </Button>
              </ListItem>
        <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/forms"
                  startIcon={<TrafficTwoToneIcon />}
                >
                  Forms
                </Button>
        </ListItem> */}
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
