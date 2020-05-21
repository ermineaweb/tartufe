import React from "react";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import useStyles from "./useStyles";


export default function Rules({openRules, setOpenRules}) {
    const classes = useStyles();

    return (
            <Dialog
                open={openRules}
                onClose={() => setOpenRules(false)}
                fullWidth={true}
                maxWidth={"sm"}
                className={classes.root}
            >
                <Typography variant="h5" color="primary">Règles de jeu</Typography>
                <Typography variant="body1" color="primary">
                    Le détective et ses adjoints ont un mot identique.
                </Typography>
                <Typography variant="body1" color="primary">
                    Un traitre (le Tartufe) se cache parmi les adjoints, il n'a pas de mot.
                </Typography>
                <Typography variant="body1" color="primary">
                    Chacun son tour, les détectives indiquent un mot pour prouver qu'ils ne sont pas le Tartufe.
                </Typography>
                <Typography variant="body1" color="primary">
                    Le Tartufe doit faire en sorte de passer inaperçu.
                </Typography>
                <Typography variant="body1" color="primary">
                    Une fois que les adjoints ont donné assez de mots, un vote a lieu.
                </Typography>
                <Typography variant="body1" color="primary">
                    Le Tartufe peut influencer le vote en faisant semblant de voter.
                </Typography>
                <Typography variant="body1" color="primary">
                    Les points sont calculés :
                </Typography>
                <Typography variant="body1" color="primary">
                    20 Points pour le TARTUFE si personne ne le démasque
                </Typography>
                <Typography variant="body1" color="primary">
                    10 Points pour le TARTUFE si la majorité ne le démasque pas
                </Typography>
                <Typography variant="body1" color="primary">
                    15 Pour le détective qui démasque seul le TARTUFE
                </Typography>
                <Typography variant="body1" color="primary">
                    10 Pour chaque détective qui démasque le TARTUFE
                </Typography>
            </Dialog>
    )
}