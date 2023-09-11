import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  errorReset,
  rechargerCredit,
} from '../features/auth/authSlice';
import axios from 'axios';
const ChargeCredit = () => {
  const [codeInput, setCodeInput] = useState('');
  const [code, setCode] = useState('');
  const [carte, setCarte] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState('');
  const utilisateurId = user.id;
  const handleGetCard = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://mystorify-api.cyclic.app/api/users/credit/${codeInput}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setCarte(res.data);
        setCode(codeInput);
        setCodeInput('');
      })
      .catch((res) => {
        setError(res.response.data.message);
        setTimeout(() => {
          setError('');
        }, 2000);
      });
  };
  const handleCode = () => {
    dispatch(rechargerCredit({ code, utilisateurId }));
    setCarte('');
    setTimeout(() => {
      setError('');
    }, 2000);
  };
  return (
    <main>
      <div className="container">
        <div style={{ marginTop: '2.5em' }} className="cart-cta">
          <form onSubmit={handleGetCard}>
            <div style={{ display: 'flex', gap: '1em' }}>
              <input
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="coupon-input"
                type="text"
                value={codeInput}
                onChange={(e) => {
                  setCodeInput(e.target.value);
                }}
              />
              {carte ? (
                <button disabled className="btn">
                  Appliquer
                </button>
              ) : (
                <button className="btn">Appliquer</button>
              )}
            </div>
            {carte && (
              <div
                style={{
                  marginTop: '1em',
                  fontSize: '1.125rem',
                  display: 'flex',
                  gap: '1em',
                }}
              >
                <p> {carte.code}</p>
                <button
                  style={{ padding: 0 }}
                  className="btn btn-secondary"
                  onClick={() => {
                    setCarte(null);
                  }}
                >
                  x
                </button>
              </div>
            )}
            {error && (
              <p
                style={{ marginTop: '1em', fontSize: '1.125rem' }}
                className="err"
              >
                {error}
              </p>
            )}
          </form>

          <div className="cart-cta-card">
            <h3>Mon Crédit</h3>
            <ul>
              <li>
                <p>Actuelle:</p>
                <p>{user.credit} DA</p>
              </li>
              <li>
                <p>Valeur Du Carte:</p>
                {carte && <p>{carte.valeur} DA</p>}
                {!carte && <p>-</p>}
              </li>
              <li>
                <p>Aprés Carte:</p>
                {carte && <p>{user.credit + carte.valeur} DA</p>}
                {!carte && <p>{user.credit} DA</p>}
              </li>
            </ul>

            <div style={{ marginTop: '1.5em', textAlign: 'center' }}>
              {carte ? (
                <button onClick={handleCode} className="btn">
                  Confirmer Code
                </button>
              ) : (
                <button disabled className="btn">
                  Confirmer Code
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ChargeCredit;
