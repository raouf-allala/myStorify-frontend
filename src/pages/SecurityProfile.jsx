import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Successs from '../components/Success';

const SecurityProfile = () => {
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();
  const user = useSelector((state) => state.auth.user);
  const [err, setErr] = useState('');
  const [empty, setEmpty] = useState([]);
  const [done, setDone] = useState();

  useEffect(() => {
    if (user?.password === 'null') {
      setEmpty(['new', 'confirm']);
    } else {
      setEmpty(['current', 'new', 'confirm']);
    }
  }, []);

  const handleErr = (e) => {
    if (e.target.value.trim() === '') {
      setEmpty((current) => [...current, e.target.id]);
    }
    if (empty.length !== 0 && e.target.value.trim() !== '') {
      if (empty.indexOf(e.target.id) > -1) {
        empty.splice(empty.indexOf(e.target.id), 1);
        console.log(e.target.id);
        e.target.style.border = '';
      }
    }
  };
  const handleReset = () => {
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
    setErr('');
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '#ed4337';
    });
  };
  const handleSubmit = () => {
    if (newPassword.current.value !== confirmNewPassword.current.value) {
      setErr('Reconfimer votre nouveau mot de passe !');
    } else {
      axios
        .patch(
          'http://localhost:3000/api/users/password',
          {
            oldPassword: currentPassword?.current?.value,
            newPassword: newPassword.current.value,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setDone(true);
        })
        .catch((error) => {
          setErr(error.response.data.message);
        });
    }
  };
  return (
    <div className='right'>
      {!done ? (
        <>
          <h2>Sécurité Du Profile</h2>
          <h3 style={{ marginBottom: '1em', color: 'black' }}>
            Modifier Mot De Passe:
          </h3>
          {err && (
            <p className='err' style={{ marginBottom: '.5em' }}>
              {err}
            </p>
          )}
          {user?.password !== 'null' ? (
            <form>
              <div>
                <label htmlFor=''>Mot De Passe Actuel</label>
                <input
                  id='current'
                  ref={currentPassword}
                  style={{ width: '65%', marginBlock: '1em' }}
                  type='text'
                  onChange={(e) => handleErr(e)}
                  onFocus={() => setErr('')}
                />
              </div>
              <div>
                <label htmlFor=''>Nouveau Mot De Passe</label>
                <input
                  id='new'
                  ref={newPassword}
                  style={{ width: '65%', marginBlock: '1em' }}
                  type='text'
                  onChange={(e) => handleErr(e)}
                />
              </div>
              <div>
                <label htmlFor=''>Confirmer Nouveau Mot De Passe</label>
                <input
                  id='confirm'
                  ref={confirmNewPassword}
                  style={{ width: '65%', marginBlock: '1em' }}
                  type='text'
                  onChange={(e) => handleErr(e)}
                  onFocus={() => setErr('')}
                />
              </div>
              <div className='btns'>
                <button
                  className='btn'
                  onClick={(e) => {
                    handleOnSubmit(e);
                    if (empty.length === 0) handleSubmit(e);
                  }}
                >
                  Sauvgarder
                </button>
              </div>
            </form>
          ) : (
            <form>
              <div>
                <label htmlFor=''>Nouveau Mot De Passe</label>
                <input
                  id='new'
                  ref={newPassword}
                  style={{ width: '65%', marginBlock: '1em' }}
                  type='text'
                  onChange={(e) => handleErr(e)}
                />
              </div>
              <div>
                <label htmlFor=''>Confirmer Nouveau Mot De Passe</label>
                <input
                  id='confirm'
                  ref={confirmNewPassword}
                  style={{ width: '65%', marginBlock: '1em' }}
                  type='text'
                  onChange={(e) => handleErr(e)}
                  onFocus={() => setErr('')}
                />
              </div>
              <div className='btns'>
                <button
                  className='btn'
                  onClick={(e) => {
                    handleOnSubmit(e);
                    if (empty.length === 0) handleSubmit(e);
                  }}
                >
                  Sauvgarder
                </button>
              </div>
            </form>
          )}
        </>
      ) : (
        <Successs message='Mot de pass a été changé !' />
      )}
    </div>
  );
};

export default SecurityProfile;
