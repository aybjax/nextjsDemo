import { Box, Typography, Button, Modal,CardHeader, CardContent, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {
    SMALL,
    CONFIRM,
    ALERT,
    NONE,
    NO,
    MEDIUM,
} from '../helpers/constants';
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
    
    let modalResponive;
    let iphone = false;
    
    iphone = useMediaQuery('(max-width:500px)');

    if(size === SMALL)
    {
        if(iphone)
        {
            const {top, ...rest} = modal
            modalResponive = {...rest}
            modalResponive.width = `${100}%`
            switch(alertModal.state)
            {
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
        }else modalResponive = modal
    }else
    {
        modalResponive = modal
    }

    let variant
    let butt
    let padding
    let width
    if( size === SMALL )
    {
      variant = 'subtitle1'
      butt = 'caption'
      padding=1
      width = 100
      if(!iphone)  modalResponive = {
          ...modalResponive,
          width: 400
      }
    }
    else if( size === MEDIUM )
    {
      variant = 'h5'
      butt = 'subtitle1'
      padding=2
      width = 150
      modalResponive = {
        ...modalResponive,
        width: 500
    }
    }
    else
    {
        variant = 'h4'
      butt = 'subtitle1'
      padding=2
      width = 200
    }

    const closeFnx = ()=> {
        setAlertModal({
            resp: NO,
            state: NONE,
            payload: {},
        })
    }
    const confirmFnx = (setInfo, setAlertModal) => () =>{
        axiosPost(setInfo, setAlertModal)
    }

    const buttonFnx = alertModal.state === ALERT ? closeFnx : confirmFnx(setInfo, setAlertModal)

    useEffect(() => {
        if(size === SMALL && alertModal.state === ALERT)
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
            setIsRead(true)
            if(autoClose) clearTimeout(autoClose)
        }
    }, [])

    return (
        <Modal open={true} onClose={()=>{}}>
            <Box borderRadius={30} bgcolor='background.paper'
            style={modalResponive} p={padding} pt={2}>
                {
                    alertModal.state === CONFIRM &&
                    <CardHeader action={<CloseIcon/>} onClick={closeFnx}/>
                }
                   <CardContent>
                   <Box p={padding} display='flex' flexDirection='column' alignItems='center'>
                        <Box>
                                <Typography variant={variant} style={{color: 'black'}}>
                                    {alertModal.state === ALERT ? 'Данные успешно сохранены' : 'Сохранить изменения?'}
                                </Typography>
                            </Box>
                            {((!iphone && alertModal.state === ALERT) || (alertModal.state === CONFIRM) ) && <Box mt={4}>
                                <Button color="primary" variant="contained" onClick={buttonFnx}>
                                    <Box width={width}>
                                        <Typography variant={butt}>
                                            {alertModal.state === ALERT ? 'Хорошо' : ' Сохранить '}
                                        </Typography>
                                    </Box>
                                </Button>
                            </Box>}
                            {
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