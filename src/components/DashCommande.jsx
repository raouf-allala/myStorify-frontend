import { useEffect, useState } from 'react';
import Logo from '../assets/Rectangle 16.png';
import { BsThreeDots } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
const DashCommande = ({ commande, link }) => {
  return (
    <>
      <div className="dash-product">
        <div className="list">
          <ul className=" nums magasins fourheaders">
            <div className="info">
              <img
                src={commande?.produit?.images[0]?.image_url}
                alt=""
              />

              <div className="text">
                <h3>
                  {' '}
                  {commande?.produit?.nom?.length > 20
                    ? commande?.produit?.nom.slice(0, 19) + '...'
                    : commande?.produit?.nom}
                </h3>
              </div>
            </div>
            <li>
              {commande?.Commande?.utilisateur?.nom}{' '}
              {commande?.Commande?.utilisateur?.prenom}{' '}
            </li>
            <li>{commande?.quantity}</li>
            <li
              style={
                commande?.etat === 'non-livré'
                  ? { color: '#FFA500' }
                  : { color: '#00B894' }
              }
            >
              {commande?.etat}
            </li>
          </ul>
        </div>

        <Link
          style={{ display: 'flex', alignItems: 'center' }}
          to={link}
        >
          <BsThreeDots className="more" />
        </Link>
      </div>
    </>
  );
};
export default DashCommande;
