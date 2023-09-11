import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authUpdate } from '../features/auth/authSlice';

const VerifyEditEmail = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const newEmail = searchParams.get('email');
  useEffect(() => {
    axios
      .patch(
        'http://localhost:3000/api/users/updateEmail',
        { newEmail },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(authUpdate(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Navigate to='/compte/email' />
    </>
  );
};
export default VerifyEditEmail;
