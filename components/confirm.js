import { Box, Typography, Button, Modal,CardHeader, CardContent, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { SMALL, CONFIRM, ALERT, NONE, NO, MEDIUM, IPHONE } from '../helpers/constants';
import { axiosPost } from '../helpers/functions';

const modal = {
      width: 600,
      position: 'absolute',
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`,
    };

export const Confirm = ({size, alertModal, setAlertModal, setInfo, setIsRead}) => {
    const [autoClose, setAutoClose] = useState()
    
    /*
    **size adjustment
    */
    let modalResponive = modal
    let padding
    let variant
    let butt
    let width
    if(size === IPHONE)
    {
        variant = 'subtitle1'
        butt = 'caption'
        width = 100
        const {top, ...rest} = modal
        modalResponive = {...rest}
        modalResponive.width = `${100}%`
        switch(alertModal.state)
        {
            //in iphone se modal dips under screen
            case ALERT:
                modalResponive.transform = `translate(-${50}%, ${30}%`
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
    else if(size === SMALL)
    {
        variant = 'subtitle1'
        butt = 'caption'
        padding=1
        width = 100
        modalResponive = {
            ...modalResponive,
            width: 400
        }
    }else if( size === MEDIUM )
    {
      variant = 'h5'
      butt = 'subtitle1'
      padding=2
      width = 150
      modalResponive = {
        ...modalResponive,
        width: 500,
        modalResponive: modal,
        }
    }
    else
    {
        variant = 'h4'
      butt = 'subtitle1'
      padding=2
      width = 200
    }
    /*
    **
    */

    //close confirmation window without saving data
    const closeFnx = ()=> {
        setAlertModal({
            resp: NO,
            state: NONE,
            payload: {},
        })
    }
    //confirm in confirmation modal
    const confirmFnx = (setInfo, setAlertModal) => () =>{
        axiosPost(setInfo, setAlertModal)
    }

    //button changes according to modal type
    const buttonFnx = alertModal.state === ALERT ? closeFnx : confirmFnx(setInfo, setAlertModal)

    useEffect(() => {
        //alerting user about saving data
            //in modal does not have button in iphone se
        //set timer to autoclose in iphone se
        if(size === IPHONE && alertModal.state === ALERT)
        {
            setAutoClose(setTimeout(()=>{
                setAlertModal(prev => (
                    {
                        ...prev,
                        state: NONE,
                    }
                ))
            }, 800))
        }

        return ()=>
        {
            //componentWillUnMount: auto close in iphone se
            if(size === IPHONE && alertModal.state === ALERT)
            {
                setIsRead(true)
            }
            if(autoClose) clearTimeout(autoClose)
        }
    }, [])
    
    return (
        <Modal open={true} onClose={()=>{}}>
            <Box borderRadius={30} bgcolor='background.paper' style={modalResponive} p={padding} pt={2}>
                {   //close button only visible in confirmation modal
                    alertModal.state === CONFIRM &&
                    <CardHeader action={<CloseIcon/>} onClick={closeFnx}/>
                }
                <CardContent>
                   <Box p={padding} display='flex' flexDirection='column' alignItems='center'>
                        {/* modal text */}
                        <Box>
                            <Typography variant={variant} style={{color: 'black'}}>
                                {alertModal.state === ALERT ? 'Данные успешно сохранены' : 'Сохранить изменения?'}
                            </Typography>
                        </Box>

                        {/* primary button: visible in confirmation and non iphone alert modal */}
                        {( ( alertModal.state === ALERT && !(size === IPHONE)) || (alertModal.state === CONFIRM) ) &&
                        <Box mt={4}>
                            <Button color="primary" variant="contained" onClick={buttonFnx}>
                                <Box width={width}>
                                    <Typography variant={butt}>
                                        {alertModal.state === ALERT ? 'Хорошо' : ' Сохранить '}
                                    </Typography>
                                </Box>
                            </Button>
                        </Box>
                        }

                        {   //button only visible in confirmation modal
                            alertModal.state === CONFIRM &&
                            <Box mt={4}>
                                <Button color="primary" variant="outlined" onClick={closeFnx}>
                                    <Box width={width}>
                                        <Typography variant={butt} color='primary'>
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