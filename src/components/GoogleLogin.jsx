import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../features/auth/authSlice';
import { Navigate, useSearchParams } from 'react-router-dom';

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [searchParams, setSearchParams] = useSearchParams();
  const [rememberMe, setRememberMe] = useState(
    JSON.parse(localStorage.getItem('rememberMe'))
  );
  const email = searchParams.get('email');

  useEffect(() => {
    if (rememberMe === true) setRememberMe(email);
    dispatch(googleLogin(rememberMe));
  }, []);
  return (
    <>{isAuthenticated ? <Navigate to='/' /> : <Navigate to='/login' />}</>
  );
};
export default GoogleLogin;
