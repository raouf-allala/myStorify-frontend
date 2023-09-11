import { useState } from 'react';
import Picture from '../assets/Login image.jpg';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const CompleteInfo = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email');
  console.log(email);
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [wilaya, setWilaya] = useState('');
  const phoneExp = /^[0-9]{9,10}$/;
  const [validPhone, setValidPhone] = useState(true);
  const [err, setErr] = useState('');
  const [empty, setEmpty] = useState(['telephone', 'adresse', 'wilaya']);

  const handleErr = (e) => {
    if (e.target.value.trim() === '') {
      setEmpty((current) => [...current, e.target.id]);
    }
    if (empty.length !== 0 && e.target.value.trim() !== '') {
      if (empty.indexOf(e.target.id) > -1) {
        empty.splice(empty.indexOf(e.target.id), 1);
        console.log(e.target.id);
        e.target.style.borderColor = 'black';
      }
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!phoneExp.test(telephone)) setValidPhone(false);
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '#ed4337';
    });
  };

  const handleUpdate = () => {
    axios
      .post(
        'http://localhost:3000/api/users/completeInfo',
        { email, telephone, adresse, wilaya },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setTimeout(() => {
          navigate(`/googleLogin?email=${email}`);
        });
      }, 500)
      .catch((err) => {
        setErr(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  return (
    <main>
      <div className='container'>
        <div className='login-flex'>
          <div className='left'>
            <img src={Picture} alt='' />
          </div>
          <div className='right'>
            <form className='right-content'>
              <h1>Se connecter à Exclusive</h1>
              <p>Completer vos information ci-dessous</p>
              <>
                <input
                  id='telephone'
                  placeholder='Telephone'
                  type='text'
                  className='login-input'
                  value={telephone}
                  onChange={(e) => {
                    setTelephone(e.target.value);
                    handleErr(e);
                  }}
                  onFocus={() => setValidPhone(true)}
                />
                {!validPhone ? (
                  <p className='err'>Ce numéro de telephone est invalide !</p>
                ) : (
                  ''
                )}
                <input
                  id='adresse'
                  placeholder='Adresse'
                  type='text'
                  value={adresse}
                  className='login-input'
                  onChange={(e) => {
                    setAdresse(e.target.value);
                    handleErr(e);
                  }}
                />
                <input
                  id='wilaya'
                  placeholder='Wilaya'
                  type='text'
                  value={wilaya}
                  className='login-input'
                  onChange={(e) => {
                    setWilaya(e.target.value);
                    handleErr(e);
                  }}
                />
              </>

              <button
                className='btn'
                onClick={(e) => {
                  handleOnSubmit(e);
                  if (empty.length === 0 && phoneExp.test(telephone))
                    handleUpdate(e);
                }}
              >
                Términé
              </button>
              <div>
                <p style={{ textAlign: 'center' }}>
                  vous n'avez pas de compte ?{' '}
                  <Link
                    style={{
                      color: 'black',
                      textDecoration: 'underline',
                      fontWeight: 500,
                    }}
                    to='/inscrire'
                  >
                    Inscrivez-vous
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default CompleteInfo;
