import React, {useEffect, useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
}));

export default function Error({error, setError}) {
    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        return () => {
            setError(null);
        }
    });

    return (
        <Snackbar
            className={classes.root}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={open}
            onClose={handleClose}
            autoHideDuration={4000}
        >
            <Alert
                elevation={6}
                variant="outlined"
                severity="error"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }
            >{error}</Alert>
        </Snackbar>
    );
}
