import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import {
  useOutletContext,
  useNavigate,
  useParams,
} from 'react-router-dom';
const CommandeDetails = () => {
  const { magasin } = useOutletContext();
  const { commandeId } = useParams();
  console.log(commandeId);
  const navigate = useNavigate();
  const [commande, setCommande] = useState();
  useEffect(() => {
    const id = commandeId;
    axios
      .get(`${import.meta.env.VITE_SERVER_HOST}/api/achat/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setCommande(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="dash-content">
      <h2>Consulter le details de cette commande</h2>
      <div className="form-flex">
        <div>
          <h3>Le produit</h3>
          <div style={{ display: 'flex', gap: '.5em' }}>
            <img
              src={commande?.produit?.images[0]?.image_url}
              alt=""
              style={{
                width: '60px',
                height: '60px',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingBlock: '.5em',
              }}
            >
              <h4 style={{ color: '#3B4C68' }}>
                {' '}
                {commande?.produit?.nom}
              </h4>
              <h4 style={{ color: '#3B4C68' }}>
                {' '}
                Le prix : {commande?.produit?.prix} DA
              </h4>
            </div>
          </div>
        </div>
        <div style={{ color: '#3B4C68' }}>
          <h3>Le client qui a fait la demande : </h3>
          <p>
            Nom :{' '}
            <span style={{ fontWeight: '500' }}>
              {commande?.Commande?.utilisateur?.nom}{' '}
              {commande?.Commande?.utilisateur?.prenom}
            </span>
          </p>
          <p
            style={{
              marginBlock: '.5em',
            }}
          >
            Prénom:{' '}
            <span style={{ fontWeight: '500' }}>
              {commande?.Commande?.utilisateur?.prenom}
            </span>
          </p>
          <p>
            Télephone :{' '}
            <span style={{ fontWeight: '500' }}>
              {commande?.Commande?.utilisateur?.telephone}
            </span>
          </p>
        </div>
      </div>
      <div style={{ color: '#3B4C68' }}>
        <p style={{ marginBottom: '.5em' }}>
          Quantity :{' '}
          <span style={{ fontWeight: '500' }}>
            {commande?.quantity}
          </span>
        </p>
        <p style={{ marginBottom: '.5em' }}>
          Total :{' '}
          <span style={{ fontWeight: '500' }}>
            {commande?.produit?.prix * commande?.quantity} DA
          </span>
        </p>
        <p>
          Etat :{' '}
          <span style={{ fontWeight: '500' }}>{commande?.etat}</span>
        </p>
      </div>
      <div
        className="btns"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1em',
        }}
      >
        <button
          className="btn"
          onClick={() => {
            navigate(`/dashboard/magasin/${magasin.id}/commandes`);
          }}
        >
          Retourner
        </button>
      </div>
    </div>
  );
};
export default CommandeDetails;
