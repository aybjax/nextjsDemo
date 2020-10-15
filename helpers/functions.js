import axios from "axios"
import { ALERT, NO, NONE, YES } from "./constants"

/*
** format name to appbar
*/
export const nameInitials = (name) => {
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
export const parseTel = (tel) => {
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

const axiosInstance = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com/posts',
    headers :{
        'Content-Type': 'application/json',
        'x-token-access': 'random'
    }
})

export const axiosPost = (setInfo, setAlertModal) => {
    let payload
    setAlertModal( prev => {
        payload = {...prev.payload}
        return {
            payload: {...prev.payload},
            state: NONE,
            resp: YES,
        }
    } )

    axiosInstance.post('/', payload)
    .then(resp => resp.data)
    .then(resp => {
        setInfo({...resp})
        setAlertModal({
            state: ALERT,
            resp:NO,
            payload:{}
        })
    })
    .catch(err => {
        alert(err)
    })
}