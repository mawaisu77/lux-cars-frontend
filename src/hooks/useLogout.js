import { useAuthContext } from './useAuthContext.js'
import { removeToken, removeUser } from '../utils/storageUtils.js';

export const useLogout = () => {
const {dispatch} = useAuthContext()

  const logout =  () => {
    removeToken()
    removeUser()
    dispatch({type:'LOGOUT'})
  };

  return { logout }
}