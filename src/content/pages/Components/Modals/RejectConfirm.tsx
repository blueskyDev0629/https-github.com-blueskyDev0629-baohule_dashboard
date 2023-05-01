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

interface RejectConfirmProps{
  ownerId: string,
  id: string,
  approvedId: string,
  status: string
}

export default function RejectConfirm(props) {
  const {ownerId, id, approvedId, status} = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const api = useGlobalApiClient();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rejectConfirm = async () => {

    const { response } = status === 1 ? 
    await  api.credit_reject_deposit_post ({
      ownId:ownerId,
      id: id,
      approvedId: approvedId,
    })
    :
    await api.credit_reject_withdrawal_post ({
      ownId:ownerId,
      id: id,
      approvedId: approvedId,
    });

    if (!response) {
      NotificationManager.error(
        "Reject failed"
      );
    } else {
      NotificationManager.success(`The User Information Updated`, "Success");
    }
    handleClose();
  };

  return (
    <div>
      <Button color="error" variant="outlined" onClick={handleClickOpen}>
        Reject
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
            Will you reject the request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={rejectConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}