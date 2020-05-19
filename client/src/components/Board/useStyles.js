import makeStyles from "@material-ui/core/styles/makeStyles";
import Wallpaper from "../../assets/img/wallpaper6.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        heigth: "100vh",
        width: "100%",
        flexGrow: 1,
        height: '100vh',
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${Wallpaper})`,
        backgroundColor: "",

        textAlign: "center",
        padding: "10px 20px",
        '& > *': {
            margin: "15px auto",
        },
    },
    players: {
        textAlign: "center",
        width: "100%",
    },
    card: {
        textAlign: "center",
        width: "150px",
    },
    infos:{
      width:"100%",
      textAlign:"center",
        heigth:"200px",
    },
    wordInput: {
        '& > *': {
            margin: "0 auto",
        },
        fontSize: "1.2em",
    },
}));

export default useStyles;