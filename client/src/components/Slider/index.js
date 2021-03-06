import withStyles from "@material-ui/core/styles/withStyles";
import Slider from "@material-ui/core/Slider";

export default withStyles({
    root: {
        color: '#d1c4e9',
        height: 8,
        width: 180,
        padding:10,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#d1c4e9',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);