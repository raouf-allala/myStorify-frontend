import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Navigate,
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { authUpdate } from '../features/auth/authSlice';

const UpdateAdmin = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nom, setNom] = useState(user?.nom);
  const [prenom, setPrenom] = useState(user?.prenom);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [validEmail, setValidEmail] = useState(true);
  const [empty, setEmpty] = useState([]);
  const [err, setErr] = useState('');

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
  const handleReset = () => {
    setNom(user?.nom);
    setPrenom(user?.prenom);
    setEmail(user?.email);
    setPassword('');
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
    setErr('');
    setValidEmail(true);
  };
  const handleUpdate = () => {
    const id = user?.id;
    axios
      .patch(
        'https://mystorify-api.cyclic.app/api/users/dash/admin/',
        {
          nom,
          prenom,
          email,
          password,
          id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate('/dashboard/admin/users');
        dispatch(authUpdate(res.data));
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  };
  return (
    <div className="dash-content">
      <div className="head">
        <h2>Consulter et modifier votre compte</h2>
      </div>
      <div className="edit-profile">
        <button className="btn">
          <Link
            to={`/dashboard/admin/update/password`}
            className="btn"
          >
            Changer mot de pass
          </Link>
        </button>

        <form style={{ marginTop: '1em' }}>
          <div className="form-flex">
            <div>
              <label htmlFor="">Nom</label>
              <input
                id="nom"
                onChange={(e) => {
                  setNom(e.target.value);
                  handleErr(e);
                }}
                value={nom}
                type="text"
              />
            </div>
            <div>
              <label htmlFor="">Prénom</label>
              <input
                id="prenom"
                onChange={(e) => {
                  setErr('');
                  setPrenom(e.target.value);
                  handleErr(e);
                }}
                value={prenom}
                type="text"
              />
            </div>
          </div>
          <div className="form-flex">
            <div>
              <label htmlFor="">Adresse email</label>
              <input
                id="email"
                onChange={(e) => {
                  setErr('');
                  setEmail(e.target.value);
                  handleErr(e);
                }}
                value={email}
                type="text"
              />
              {!validEmail && (
                <p className="err" style={{ marginTop: '.5em' }}>
                  Cette adresse email est invalide !
                </p>
              )}
            </div>
            <div></div>
          </div>
          <div className="btns">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
              className="btn btn-sec"
            >
              Réinitialiser
            </button>
            <button
              className="btn"
              onClick={(e) => {
                handleOnSubmit(e);
                setValidEmail(emailExp.test(email));
                if (
                  emailExp.test(email) &&
                  empty.length === 0 &&
                  !err
                ) {
                  handleUpdate();
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
export default UpdateAdmin;
