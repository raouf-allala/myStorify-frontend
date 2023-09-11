import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Successs from '../components/Success';
import EmailSent from '../components/EmailSent';
const EditEmail = () => {
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState(user?.email);
  const [nom, setNom] = useState(user?.nom);
  const [newEmail, setNewEmail] = useState();
  const [done, setDone] = useState(false);
  const [err, setErr] = useState();
  const [validEmail, setValidEmail] = useState(true);
  const [empty, setEmpty] = useState();
  const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  useEffect(() => {
    setEmail(user.email);
  }, [user]);
  const handleErr = (e) => {
    if (e.target.value.trim() === '') {
      e.target.style.borderColor = '#ed4337';
      setEmpty(true);
    } else {
      e.target.style.borderColor = '';
      setEmpty(false);
    }
  };
  const handleOnSubmit = (e) => {
    const input = document.getElementById('newEmail');
    if (!empty) input.style.borderColor = '';
    else input.style.borderColor = '#ed4337';
  };
  const handleSubmit = () => {
    if (email === newEmail)
      setErr("Cette adresse email est la meme que l'actuelle !");
    else
      axios
        .post(
          'http://localhost:3000/api/users/verifyEditEmail',
          { nom, newEmail },
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
    <div className='right'>
      <h2>Email De Profile</h2>
      <h3 style={{ marginBottom: '1em', color: 'black' }}>
        Modifier L'adresse Email:
      </h3>

      {!done && (
        <form>
          <div className='form-flex'>
            <div>
              <label htmlFor=''>Email Actuelle</label>
              <input
                id='email'
                placeholder='Email'
                type='text'
                className='login-input'
                value={email}
                disabled
              />
            </div>
          </div>
          <div className='form-flex'>
            <div>
              <label htmlFor=''>Nouveau Email</label>
              <input
                id='newEmail'
                placeholder='Nouveau Email'
                type='text'
                className='login-input'
                style={{ marginBottom: '.5em' }}
                onChange={(e) => {
                  setNewEmail(e.target.value);
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
              {err && <p className='err'>{err}</p>}
            </div>
          </div>
          <div className='btns'>
            <button
              className='btn'
              onClick={(e) => {
                e.preventDefault();
                handleOnSubmit(e);
                setValidEmail(emailExp.test(newEmail));
                if (emailExp.test(newEmail) && !empty) handleSubmit();
              }}
            >
              Suivant
            </button>
          </div>
        </form>
      )}
      {done && (
        <div className='right-content'>
          <EmailSent />
        </div>
      )}
    </div>
  );
};
export default EditEmail;
