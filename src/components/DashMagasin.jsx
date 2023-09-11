import { useEffect, useState } from 'react';
import Logo from '../assets/Rectangle 16.png';
import { BsThreeDots } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
const DashMagasin = ({ magasin }) => {
  return (
    <>
      <div className='dash-product'>
        <div className='list'>
          <ul className='nums magasins'>
            <div className='info'>
              <img src={magasin?.logo} alt='' />

              <div className='text'>
                <h3>
                  {' '}
                  {magasin?.nom?.length > 20
                    ? magasin?.nom.slice(0, 19) + '...'
                    : magasin?.nom}
                </h3>
              </div>
            </div>
            <li>
              {magasin?.Utilisateur?.nom + ' '} {magasin?.Utilisateur?.prenom}
            </li>
            <li>{magasin?.Categorie?.nom} </li>
          </ul>
        </div>

        <Link
          style={{ display: 'flex', alignItems: 'center' }}
          to={`/dashboard/admin/magasins/${magasin.id}`}
        >
          <BsThreeDots className='more' />
        </Link>
      </div>
    </>
  );
};
export default DashMagasin;
