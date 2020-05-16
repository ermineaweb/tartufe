import makeStyles from "@material-ui/core/styles/makeStyles";
import Wallpaper from "../../assets/img/wallpaper5.png";

const useStyles = makeStyles((theme) => ({
    root: {

        flexGrow: 1,
        height: '100vh',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",


        backgroundColor: "",
        padding: "10px 20px",
        backgroundImage: `url(${Wallpaper})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        heigth:"100vh",
        width:"100%",
        textAlign: "center",
        '& > *': {
            margin: "10px auto",
            width: "100%",
            heigth: "100%",
            textAlign: "center",
        },
    },
    rootJoin: {
        margin: "50px auto",
        // width: "300px",
        '& > *': {
            margin: "10px auto",
            width: "100%",
            heigth: "100%",
            textAlign: "center",
        },
    },
    dialog: {
        padding: 50,
        overflow: "hidden",
    }
}));

export default useStyles;