import React, { useState } from 'react';
import cibLogo from '../assets/CIB.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

function CIB() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [transactionData, setTransactionData] = useState({
    amount: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    cardHolderName: '',
  });
  const commande = JSON.parse(localStorage.getItem('commande'));
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'http://localhost:3000/api/achat',
        commande,

        { withCredentials: true }
      )
      .then((res) => {
        dispatch(clearCart());
        navigate('/paiement/?done=true');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="payment-CIB">
      <h1 className="titlecib">
        Bienvenue Sur la plateforme de paiement par carte
        interbancaire
      </h1>
      <div className="card-form">
        <div className="blue-banner">
          <h2 className="banner-text">
            Formulaire Paiement En Ligne{' '}
          </h2>
        </div>
        <div className="border-container">
          <div className="logo-container">
            <img className="logo" src={cibLogo} alt="CIB Logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="blue-banner">
              <h3 className="banner-text">Informations client</h3>
            </div>
            <div className="input-container">
              <label htmlFor="amount">
                Montant de la transaction :
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                placeholder="Montant en dinars algériens"
                value={commande.totale}
                disabled
              />

              <label htmlFor="cardHolderName">
                Nom du titulaire de la carte :
              </label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                placeholder="Nom complet"
                value={transactionData.cardHolderName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="blue-banner">
              <h3 className="banner-text">
                Informations de la carte
              </h3>
            </div>
            <div className="input-container">
              <label htmlFor="cardNumber">Numéro de carte :</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Numéro de carte à 16 chiffres"
                value={transactionData.cardNumber}
                onChange={handleChange}
                required
              />

              <label htmlFor="expirationDate">
                Date d'expiration :
              </label>
              <input
                type="Month"
                id="expirationDate"
                name="expirationDate"
                placeholder="MM/AA"
                value={transactionData.expirationDate}
                onChange={handleChange}
                required
              />

              <label htmlFor="securityCode">Code de sécurité :</label>
              <input
                type="text"
                id="securityCode"
                name="securityCode"
                placeholder="Code à 3 chiffres"
                value={transactionData.securityCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-container">
              <button className="submit-button" type="submit">
                Valider
              </button>
              <button className="reset-button" type="reset">
                Réinitialiser
              </button>
              <button className="cancel-button">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CIB;
