import { Alert, Snackbar } from "@mui/material";

const Notification = (props) => {
    const { notify, setNotify } = props;
    const handleClose = (event, reason) => {
        setNotify({
            ...notify,
            isOpen: false
        });
    };
    return (
        <Snackbar
        sx={{top:20}}
            open={notify?.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert  onClose={handleClose} severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
    );
}
export default Notification