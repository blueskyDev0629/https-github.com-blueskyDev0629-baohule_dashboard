import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useGlobalApiClient } from 'src/core/useApiClient';
import {NotificationManager} from 'react-notifications';

interface ApproveConfirmProps{
  ownerId: string,
  id: string,
  approvedId: string,
  status?: number
}

export default function ApproveConfirm(props) {
  const {ownerId, id, approvedId, status} = props;
  const [open, setOpen] = React.useState(false);
  const api = useGlobalApiClient();

  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const approveConfirm = async () => {
    const { response } = 
    status === 1?
    await api.credit_approve_deposit_post({
      ownId:ownerId,
      id: id,
      approvedId: approvedId,
    })
    :
    await api.credit_approve_withdrawal_post({
      ownId:ownerId,
      id: id,
      approvedId: approvedId,
    })
    ;
    status == 1 ? console.log("deposit") : console.log("withdraw");
    if (!response) {
      NotificationManager.error(
        "Failed call"
      );
    } else {
      console.log("response===>",response);
      NotificationManager.success(`The User Information Updated`, "Success");
    }
    handleClose();
  };

  return (
    <div>
      <Button color="primary" variant="outlined" onClick={handleClickOpen}>
        Approve
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Will you approve the request.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={approveConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}