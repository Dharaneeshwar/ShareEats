//  import { auth } from '../firebase-config';


export const isLoggedIn = () => {
    let auth = localStorage.getItem('authObj');
    if (auth) {
        return true;
    } 
    return false;
}

export const setUser = (user) => {
}

export const getUser = () => {
    
}