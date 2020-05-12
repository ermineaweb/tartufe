import React, {useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";


export default function Error({error}) {
    const [open, setOpen] = useState(true);

    return (
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            key={error}
            open={open}
            onClose={setOpen(false)}
            message={error}
        />
    )
}