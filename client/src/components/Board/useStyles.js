import makeStyles from "@material-ui/core/styles/makeStyles";
import Wallpaper from "../../assets/img/wallpaper6.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
        height: '100vh',

        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundImage: `url(${Wallpaper})`,
        backgroundColor: "",

        textAlign: "center",
        padding: "5px 10px",
    },
}));

export default useStyles;