import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  styled,
  Grid,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import AddAlertTwoToneIcon from "@mui/icons-material/AddAlertTwoTone";

import { ellipseText } from "src/library/DataItemLib";
import EditUserInfoDialog, {
  EditUserInfo,
} from "src/content/pages/Components/Modals/EditUserInfo";
import { EditUserCredit } from "src/content/pages/Components/Modals/EditUserCredit";

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === "dark"
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === "dark"
          ? "0 1px 0 " +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ", 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)"
          : "0px 2px 4px -3px " +
            alpha(theme.colors.alpha.black[100], 0.4) +
            ", 0px 5px 16px -4px " +
            alpha(theme.colors.alpha.black[100], 0.2)
      };
`
);

function PageHeader(props: {
  userID: string;
  userEmail: string;
  userName: string;
  balance: number;
}) {
  return (
    <Box
      display="flex"
      alignItems={{ xs: "stretch", md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Grid container spacing={2}>
        <Grid item sm={7}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={3}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <AvatarPageTitle variant="rounded">
                <AddAlertTwoToneIcon fontSize="large" />
              </AvatarPageTitle>
            </Grid>
            <Grid item sm={9}>
              <Grid item xs={12}>
                <Typography variant="h3" component="h3" gutterBottom>
                  {ellipseText(props.userName)}'s detailed data
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  User ID : {props.userID}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={5} sx={{ display: "flex", alignItems: "center" }}>
          <Grid container spacing={2} textAlign={"right"}>
            <Grid item sm={12} md={6} textAlign={"right"}>
              <EditUserInfo userID={props.userID} />
            </Grid>
            <Grid item sm={12} md={6} textAlign={"right"}>
              <EditUserCredit userID={props.userID} balance={props.balance} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <Typography variant="subtitle2">
                Name : {props.userName}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2">
                Email : {props.userEmail}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2">
                Balance : {props.balance}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PageHeader;
