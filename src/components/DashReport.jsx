import { useEffect, useState } from 'react';
import Logo from '../assets/Rectangle 16.png';
import { BsThreeDots } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
const DashReport = ({ report }) => {
  return (
    <>
      <div className='dash-product'>
        <div className='list'>
          <ul className='nums magasins'>
            <li>{report?.titre} </li>
            <li>
              {report?.utilisateur?.nom + ' '} {report?.utilisateur?.prenom}
            </li>
            <li>{report?.type} </li>
          </ul>
        </div>

        <Link
          style={{ display: 'flex', alignItems: 'center' }}
          to={`/dashboard/admin/reports/${report.id}`}
        >
          <BsThreeDots className='more' />
        </Link>
      </div>
    </>
  );
};
export default DashReport;
