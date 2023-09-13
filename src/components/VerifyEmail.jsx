import axios from 'axios';
import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

const VerifyEamil = () => {
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SERVER_HOST}/api/users/verifyEmail`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navigate to="/login" />
    </>
  );
};
export default VerifyEamil;
