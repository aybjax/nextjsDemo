import axios from "axios"
import { IPHONE, LARGE, MEDIUM, SMALL } from "./constants"
import * as actionTypes from '../states/actions'

/*
** media queries properties
*/

export const mediaProps = (size, large, media, small, iphone) =>
{
    if(size === LARGE) return large
    if(size === MEDIUM) return media
    if(size === SMALL) return small
    if(size === IPHONE) return iphone
}

/*
** format name to appbar
*/
export const nameInitials = (name) =>
{
    const nameArr = name.split(/\s/)
    if(nameArr.length === 0) return 'Незнаком Я.'
    else if(nameArr.length === 1) return `${name}`
    const fn = nameArr[0]
    const ln = nameArr[1]
    return `${fn} ${ln.charAt(0)}.`
}

/*
** format telefon number
*/
export const parseTel = (tel) =>
{
    if( !(/^\+\d{11}$/.test(tel)) ) return tel
    const arr = []
    let index=0
    let incr
    for(let i=0; i<5; i++)
    {
        switch(i)
        {
            case 0:
            case 3:
            case 4:
                incr = 2
                break
            case 1:
            case 2:
                incr = 3
                break
            default:
                new Error('unknown phone pattern')
            
        }
        arr[i] = tel.slice(index, index + incr)
        index += incr
    }
    return arr.join(' ')
}

/*
*Axios related fnxs
*/

export const axiosPost = (state, dispatch) =>
{
    //for loading animation
    dispatch({
        type: actionTypes.START_LOADING_ANIMATION
    })

    //actual request
    axios.post('/api/v1/user-info', state.payload)
    .then(resp => resp.data)
    .then(resp => {
        //remove modal + set data
        dispatch({
            type: actionTypes.SAVE_RESPONSE_DATA,
            payload: {...resp}
        })
        localStorage.setItem('userInfo', JSON.stringify(resp))
    })
    //fnx above should not give any error
        //not checking for network errors
    .catch(err => {})
}