import makeStyles from "@material-ui/core/styles/makeStyles";
import Wallpaper from "../../assets/img/wallpaper6.jpg";

const useStyles = makeStyles((theme) => ({
    root: {

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        textAlign: "center",

        height: '100vh',
        width: "100%",

        backgroundImage: `url(${Wallpaper})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
    },
    rootJoin: {
        width: "250px",
        '& > *': {
            margin: "20px auto",
            width: "100%",
            heigth: "100%",
            textAlign: "center",
        },
    },
    options: {
        margin: "10px 40px",
        textAlign: "center",
        '& > *': {
            margin: "20px auto",
            width: "100%",
        },
    }
}));

export default useStyles;