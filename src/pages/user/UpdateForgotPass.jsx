import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picture from '../../assets/Login image.jpg';
import Successs from '../../components/Success';

import axios from 'axios';
const UpdateForgotPass = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const [firstPass, setFirstPass] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [empty, setEmpty] = useState(['first', 'confirm']);
  const [done, setDone] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstPass !== password) {
      setErr(
        "Confirmer le mot de pass correctement s'il vous plait !"
      );
      console.log(err);
    } else {
      axios
        .patch(
          'https://mystorify-api.cyclic.app/api/users/updateForgotPass',
          { password },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          setDone(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <main>
      <div className="container">
        <div className="login-flex">
          <div className="left">
            <img src={Picture} alt="" />
          </div>
          <div className="right">
            {!done && (
              <form className="right-content">
                <h1>Changer votre mot de pass</h1>
                <p>Entrez le nouveau mot de pass ci-dessous</p>
                {err && <p className="err">{err}</p>}
                <input
                  id="first"
                  placeholder="Mot de Pass"
                  type="password"
                  className="login-input"
                  onFocus={(e) => {
                    setErr('');
                  }}
                  onChange={(e) => {
                    setFirstPass(e.target.value);
                    handleErr(e);
                  }}
                />
                <input
                  id="confirm"
                  placeholder="Confirmer mot de pass"
                  type="password"
                  className="login-input"
                  onFocus={(e) => {
                    setErr('');
                  }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleErr(e);
                  }}
                />
                <div className="login-cta">
                  <button
                    className="btn"
                    onClick={(e) => {
                      handleOnSubmit(e);
                      handleSubmit(e);
                    }}
                  >
                    Confirmer
                  </button>
                </div>
              </form>
            )}
            {done && (
              <div className="right-content">
                <Successs
                  message="Votre compte a été modifié avec succès !"
                  login={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default UpdateForgotPass;
