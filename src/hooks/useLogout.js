import { useAuthContext } from './useAuthContext.js'
import { getToken, getUser, removeToken, removeUser } from '../utils/storageUtils.js';

export const useLogout = () => {
const {dispatch} = useAuthContext()
const { user } = useAuthContext();


  const logout =  () => {
    removeToken()
    removeUser()
    dispatch({type:'LOGOUT'})

    // console.log('logout')
    // console.log(getUser())
    // console.log(getToken())
    // console.log(user)

  };

  return { logout }
}