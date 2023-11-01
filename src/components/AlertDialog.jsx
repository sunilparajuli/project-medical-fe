import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(()=>{
    setOpen(true);
  }, []);


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.type==='success' ? (<> Success</>) : (<>Failed</>)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* {JSON.stringify(props)} */}
            {props.type==='error' ? (<>
            <b> Invalid of missing following fields</b>
            {Object.keys(props.message.data).map((fieldName) => (
              <li key={fieldName}>
                {fieldName}
              </li>
            
            ))}
            </>) : 
            (<>
              {JSON.stringify(props)}
            </>)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
