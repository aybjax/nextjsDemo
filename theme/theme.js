import {createMuiTheme} from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';


export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#01BDA7',
        },
        secondary: {
            main: '#fff',
        },
        action: {
            main: '#9c27b0',
        },
    },
    // spacing: 8,
    shape: {
        borderRadius: 10,
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 30,
            },
            containedPrimary: {
                color: "primary",
            }
        },
        MuiBreadcrumbs: {
            separator: {
                color: 'secondary',
            },
        },
    },
    props: {
        MuiSvgIcon: {
            color: 'primary',
            fontSize: 'small',
        },
        MuiPaper: {
            color: 'secondary',
        },
        MuiTypography: {
            color: 'secondary',
        },
        MuiCard: {
            padding: 2,
        },
    },

})