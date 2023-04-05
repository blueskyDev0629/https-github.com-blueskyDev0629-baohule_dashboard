import { useContext } from 'react';

import { NavLink as RouterLink } from 'react-router-dom';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Button,
  Card,
  Typography
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import { isMobile } from 'react-device-detect';
import useMediaQuery from '@mui/material/useMediaQuery';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const { sidebarToggle, closeSidebar, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const matches = useMediaQuery('(min-width:800px)');

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        {matches?(
          <Card sx={{paddingTop:'20px', paddingBottom:'20px', minWidth:'500px'}}>
          <Box sx={{display:'flex'}}>
            <Typography ml={2} sx={{display:'flex', fontSize:'300', color:'#52b202'}}>Available Quota:&nbsp;&nbsp;<Typography variant='subtitle1' color="white">25000</Typography></Typography>
            <Typography ml={2} sx={{display:'flex', fontSize:'300', color:'#52b202'}}>Used Quota:&nbsp;&nbsp;<Typography variant='subtitle1' color="white">12000</Typography></Typography>
            <Typography ml={2} sx={{display:'flex', fontSize:'300', color:'#52b202'}}>Balance:&nbsp;&nbsp;<Typography variant='subtitle1' color="white">$4000</Typography></Typography>
            <Typography ml={2} mr={2} sx={{display:'flex', fontSize:'300', color:'#52b202'}}>Due Date:&nbsp;&nbsp;<Typography variant='subtitle1' color="white">03/12/2023</Typography></Typography>
          </Box>
        </Card>
        ):(<></>)}
          
      </Stack>
      <Box display="flex" alignItems="center">
        {/* <HeaderButtons /> */}
        {/* <HeaderUserbox /> */}
        <Button
          variant='contained'
          component={RouterLink}
          onClick={closeSidebar}
          to="/signin"
        >
          Sign Out
        </Button>
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
