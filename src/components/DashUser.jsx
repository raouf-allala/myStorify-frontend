import { useEffect, useState } from 'react';
import Logo from '../assets/Rectangle 16.png';
import { BsThreeDots } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
const DashUser = ({ user }) => {
  return (
    <>
      <div className='dash-product'>
        <div className='list'>
          <ul className='cols nums'>
            <li>{user?.nom} </li>
            <li>{user?.prenom} </li>
            <li>{user?.adresse}</li>
            <li>{user?.wilaya}</li>
            <li>{user?.telephone}</li>
          </ul>
        </div>

        <Link
          style={{ display: 'flex', alignItems: 'center' }}
          to={`/dashboard/admin/users/${user.id}`}
        >
          <BsThreeDots className='more' />
        </Link>
      </div>
    </>
  );
};
export default DashUser;
