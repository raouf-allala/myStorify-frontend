import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Picture from '../assets/Login image.jpg';
import axios from 'axios';
import EmailSent from '../components/EmailSent';

const ForgotPass = () => {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState('');
  const [err, setErr] = useState();
  const [empty, setEmpty] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const handleErr = (e) => {
    if (e.target.value.trim() === '') {
      e.target.style.borderColor = '#ed4337';
    } else e.target.style.borderColor = 'black';
  };
  const handleOnSubmit = (e) => {
    const input = document.getElementById('email');
    if (!empty) input.style.borderColor = '#ed4337';
  };
  const handleSubmit = () => {
    axios
      .post(
        'http://localhost:3000/api/users/forgotPass',
        { email },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setDone(true);
      })
      .catch((error) => {
        setErr(error.response.data.message);
      });
  };
  return (
    <>
      <main>
        <div className='container'>
          <div className='login-flex'>
            <div className='left'>
              <img src={Picture} alt='' />
            </div>
            <div className='right'>
              {!done && (
                <form className='right-content'>
                  <h1>avez-vous oublié le mot de passe?</h1>
                  <p>Entrez l'adresse email de votre compte ci-dessous</p>
                  {err && <p className='err'>{err}</p>}
                  <input
                    id='email'
                    placeholder='Email'
                    type='text'
                    className='login-input'
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleErr(e);
                    }}
                    onFocus={() => {
                      setErr('');
                      setValidEmail(true);
                    }}
                  />
                  {!validEmail && (
                    <p className='err'>Cette Adresse email est invalide !</p>
                  )}
                  <div className='login-cta'>
                    <button
                      className='btn'
                      onClick={(e) => {
                        e.preventDefault();
                        handleOnSubmit(e);
                        setValidEmail(emailExp.test(email));
                        if (emailExp.test(email)) handleSubmit();
                      }}
                    >
                      Suivant
                    </button>
                    <Link className='btn btn-secondary' to='/login'>
                      Login
                    </Link>
                  </div>
                </form>
              )}
              {done && (
                <div className='right-content'>
                  <EmailSent />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default ForgotPass;
