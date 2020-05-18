import { atom } from 'recoil';

const accessToken = localStorage.getItem("accessToken")

const userLoggedState = atom({
    key :'userLoggedState',
    default : Boolean(accessToken)
})

export {userLoggedState}