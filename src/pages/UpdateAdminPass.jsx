import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { authUpdate } from '../features/auth/authSlice';

const UpdateAdminPass = () => {
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();
  const [err, setErr] = useState('');
  const [empty, setEmpty] = useState(['new', 'current', 'confirm']);
  const [done, setDone] = useState();
  const handleErr = (e) => {
    if (e.target.value.trim() === '') {
      setEmpty((current) => [...current, e.target.id]);
    }
    if (empty.length !== 0 && e.target.value.trim() !== '') {
      if (empty.indexOf(e.target.id) > -1) {
        empty.splice(empty.indexOf(e.target.id), 1);
        console.log(e.target.id);
        e.target.style.borderColor = '';
      }
    }
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
          'http://localhost:3000/api/users/dash/admin/password',
          {
            oldPassword: currentPassword?.current?.value,
            newPassword: newPassword.current.value,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setDone(true);
          setErr(res.response.data.message);
        })
        .catch((error) => {
          setErr(error.response.data.message);
          console.log(err);
        });
    }
  };
  return (
    <div className='dash-content'>
      <div className='head'>
        <h2>Changer votre mot de pass</h2>
      </div>
      <div className='edit-profile'>
        <button className='btn'>
          <Link to={`/dashboard/admin/update/`} style={{ color: 'white' }}>
            Modifier compte
          </Link>
        </button>
        <form style={{ marginTop: '1em' }}>
          {err && <p className='err'>{err}</p>}
          <div className='form-flex'>
            <div>
              <label htmlFor=''>Mot De Passe Actuel</label>
              <input
                id='current'
                ref={currentPassword}
                type='text'
                onChange={(e) => handleErr(e)}
                onFocus={() => setErr('')}
              />
            </div>
            <div></div>
          </div>
          <div className='form-flex'>
            <div>
              <label htmlFor=''>Nouveau Mot De Passe</label>
              <input
                id='new'
                ref={newPassword}
                type='text'
                onChange={(e) => handleErr(e)}
              />
            </div>
            <div></div>
          </div>
          <div className='form-flex'>
            <div>
              <label htmlFor=''>Confirmer Nouveau Mot De Passe</label>
              <input
                id='confirm'
                ref={confirmNewPassword}
                type='text'
                onChange={(e) => handleErr(e)}
                onFocus={() => setErr('')}
              />
            </div>
            <div></div>
          </div>
          <div className='btns'>
            <button
              className='btn'
              onClick={(e) => {
                handleOnSubmit(e);

                if (empty.length === 0 && !err) {
                  handleSubmit();
                }
              }}
            >
              Sauvgareder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateAdminPass;
