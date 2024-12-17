import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
  // console.log('Checking token:', token); // Log the token being checked
  if (!token) {
    // console.log('No token provided, returning false.'); // Log when no token is provided
    return false;
  }
  
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = decodedToken.exp < currentTime;
    // console.log('Token expiration status:', isExpired); // Log the expiration status
    return isExpired;
  } catch (error) {
    // console.error('Invalid token format:', error); // Log the error for invalid token
    return false; // Invalid token format
  }
};