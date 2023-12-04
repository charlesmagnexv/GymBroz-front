import { makeStyles } from '@mui/styles'
import theme from '../../theme'

const useStyles = makeStyles({
    modalStyle: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: '600px',
        minHeight: '600px',
        width: '750px',
        [theme.breakpoints.down('md')]: {
            width: '450px'
        }
    },
    formStyle: {
        padding: '1.2rem 0'
    },
    boxInputsStyle: {
        margin: '10px 0px 15px !important'
    },
    boxInputsLimitStyle: {
        margin: '10px 0px 20px !important',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'flex-start'
        },
    },
    inputsStyle: {
        width: '90%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    labelCheck: {
        marginLeft: 2,
    },
    alertLocal: {
        marginTop: '8px',
        marginBottom: '10px',
        '&.MuiAlert-root': {
            backgroundColor: 'rgb(229, 246, 253)',
            color: 'rgb(1, 67, 97)'
        }
    },
    gridBtns: {
        display: 'flex',
    },
    btnAdd: {
        backgroundColor: theme.palette.success.light + " !important",
        color: 'white !important',
        marginLeft: '1.5rem !important',
        marginTop: '1.1rem !important',
        marginBottom: '1.1rem !important',
    },
    btnSubmit: {
        width: '150px !important',
        padding: '10px 20px !important',
        fontSize: '15px !important',
        backgroundColor: '#C90FFA !important',
        color: 'white !important',
        marginLeft: '1.5rem !important',
        marginTop: '1.1rem !important',
        transition: 'all .2s ease-in-out !important',
    },
    btnCancel: {
        backgroundColor: theme.palette.error.light + " !important",
        color: 'white !important',
        marginTop: '1.1rem !important',
        marginBottom: '1.1rem !important',
    },
    datePickerStyle: {
        "& input": {
            border: 'none !important',
            boxShadow: 'none !important'
        },
        '&.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
            margin: '0px !important'
        }
    },
    timePickerStyle: {
        "& input": {
            border: 'none !important',
            boxShadow: 'none !important'
        },
    },
    helperText: {
        color: theme.palette.info.light,
        position: 'relative',
        height: '5px',
        marginBottom: '5px',
    }

})

export default useStyles