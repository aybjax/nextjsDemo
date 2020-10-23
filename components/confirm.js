import { Box, Typography, Button, Modal,CardHeader, CardContent, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { CONFIRM, ALERT, IPHONE } from '../helpers/constants';
import {mediaProps} from '../helpers/functions'
import { axiosPost } from '../helpers/functions';

import * as actionTypes from '../states/actions'

export const Confirm = ({size, state, dispatch}) => {
    const [autoClose, setAutoClose] = useState()
    
    /*
    **size adjustment
    */

   const {
        padding,
        variant,
        btnStyle,
        width
    } = mediaProps(size, large, medium, small, iphone)



    let modalResponive = {
        ...modal,
        ...mediaProps(size, {}, {width: 500, modalResponive: modal}, {width: 400}, {width: `${102}%`})
    }

    if(size === IPHONE)
    {
        const {top, ...rest} = modalResponive
        modalResponive = {...rest}
        switch(state.modalState)
        {
            //in iphone se modal dips under screen
            case ALERT:
                modalResponive.transform = `translate(-${50}%, ${25}%`
                modalResponive.bottom = 0
                break
            case CONFIRM:
                modalResponive.transform = `translate(-${50}%, ${5}%`
                modalResponive.bottom = 0
                modalResponive.height = `${75}%`
                break
            default:
                new Error('Unknown modal state')
        }
    }
    /*
    **
    */

    //close confirmation window without saving data
    const closeFnx = () => dispatch({
                                type: actionTypes.CLOSE_MODAL_CLEAR_DATA
                            })
    //confirm in confirmation modal
    const initSaving = () => axiosPost(state, dispatch)

    const confirmSaving = () => dispatch({
                                    type: actionTypes.CLOSE_MODAL_TO_HOME
                                })

    //button changes according to modal type
    const buttonFnx = state.modalState === ALERT ? confirmSaving : initSaving

    useEffect(() => {
        //alerting user about saving data
            //in modal does not have button in iphone se
        //set timer to autoclose in iphone se
        if(size === IPHONE && state.modalState === ALERT)
        {
            setAutoClose( setTimeout(()=> confirmSaving(), 800))
        }

        return ()=>
        {
            // //componentWillUnMount: auto close in iphone se
            if(autoClose) clearTimeout(autoClose)
        }
    }, [])
    
    return (
        <Modal open={true} onClose={()=>{}} className='modal'>
            <Box borderRadius={30} bgcolor='background.paper' style={modalResponive} p={padding} pt={2}>
                {   //close button only visible in confirmation modal
                    state.modalState === CONFIRM &&
                    <CardHeader action={<CloseIcon/>} onClick={closeFnx}/>
                }
                <CardContent>
                   <Box p={padding} display='flex' flexDirection='column' alignItems='center'>
                        {/* modal text */}
                        <Box>
                            <Typography variant={variant} style={{color: 'black'}}>
                                {state.modalState === ALERT ? 'Данные успешно сохранены' : 'Сохранить изменения?'}
                            </Typography>
                        </Box>

                        {/* primary button: visible in confirmation and alert modal (non iphone ) */}
                        {( ( state.modalState === ALERT && !(size === IPHONE)) || (state.modalState === CONFIRM) ) &&
                        <Box mt={4}>
                            <Button color="primary" variant="contained" onClick={buttonFnx}>
                                <Box width={width}>
                                    <Typography variant={btnStyle}>
                                        {state.modalState === ALERT ? 'Хорошо' : ' Сохранить '}
                                    </Typography>
                                </Box>
                            </Button>
                        </Box>
                        }

                        {   //button only visible in confirmation modal
                            state.modalState === CONFIRM &&
                            <Box mt={4}>
                                <Button color="primary" variant="outlined" onClick={closeFnx}>
                                    <Box width={width}>
                                        <Typography variant={btnStyle} color='primary'>
                                            Не сохранять
                                        </Typography>
                                    </Box>
                                </Button>
                            </Box>
                        }
                    </Box>
                </CardContent>
         </Box>
        </Modal>
        
    )
}


const large = {
    variant: 'h4',
    btnStyle: 'subtitle1',
    padding: 2,
    width: 200,
}

const medium = {
    variant: 'h5',
    btnStyle: 'subtitle1',
    padding: 2,
    width: 150,
}

const small = {
    variant: 'subtitle1',
    btnStyle: 'caption',
    padding: 1,
    width: 100,
}

const iphone = {
    variant: 'subtitle1',
    btnStyle: 'caption',
    width: 100,
    padding: 0,
}

const modal = {
    width: 600,
    position: 'absolute',
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
