import React from "react";
import Typography from "@material-ui/core/Typography";


export default function Words({words}) {

    return (
        <>
            {words.map((word, index) => (
                <Typography key={index}>
                    {word}
                </Typography>
            ))}
        </>
    )
}