import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
const AddUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const [adresse, setAdresse] = useState();
  const [wilaya, setWilaya] = useState();
  const [password, setPassword] = useState();
  const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [validEmail, setValidEmail] = useState(true);
  const [dropdownDate, setDropdownDate] = useState(false);
  const [type, setType] = useState('Utilisateur');
  const [empty, setEmpty] = useState([]);
  const phoneExp = /^[0-9]{9,10}$/;
  const [validPhone, setValidPhone] = useState(true);
  const [err, setErr] = useState('');
  useEffect(() => {
    if (type === 'Utilisateur') {
      setEmpty([
        'nom',
        'prenom',
        'telephone',
        'wilaya',
        'adresse',
        'email',
        'password',
      ]);
    } else {
      setEmpty(['nom', 'prenom', 'email', 'password']);
    }
  }, [type]);
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
    setNom('');
    setPrenom('');
    setEmail('');
    setAdresse('');
    setTelephone('');
    setWilaya('');
    setPassword('');
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
    setErr('');
    setValidPhone(true);
    setValidEmail(true);
  };

  const handleAdd = () => {
    axios
      .post(
        'https://mystorify-api.cyclic.app/api/users/dash/admin/add',
        {
          nom,
          prenom,
          email,
          adresse,
          telephone,
          wilaya,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate('/dashboard/admin/users');
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  };
  return (
    <div className="dash-content">
      <div className="head">
        <h2>Ajouter un utilisateur</h2>
        <p>Remplire la formulaire ci-dessus :</p>
      </div>
      <div className="edit-profile">
        <div className="form-flex">
          <div>
            <label>Type</label>
            <div
              className="dropdown"
              style={{ zIndex: '5', marginTop: '.5em' }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownDate((current) => !current);
                }}
                className={dropdownDate ? 'dropdown-open' : undefined}
              >
                {type}
                <IoIosArrowDown
                  className={
                    !dropdownDate
                      ? 'arrow-down'
                      : 'arrow-down arrow-down-rotated'
                  }
                />
              </button>
              <AnimatePresence>
                {dropdownDate && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="dropdown-methods"
                  >
                    <li
                      onClick={(e) => {
                        setType('Utilisateur');
                        setDropdownDate(false);
                        handleReset(e);
                      }}
                    >
                      Utilisateur
                    </li>
                    <li
                      onClick={(e) => {
                        setType('Admin');
                        setDropdownDate(false);
                        handleReset(e);
                      }}
                    >
                      Admin
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            {err && <p className="err">{err}</p>}
          </div>
          <div></div>
        </div>
        {type === 'Utilisateur' ? (
          <form>
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
                <label htmlFor="">Addresse</label>
                <input
                  id="adresse"
                  onChange={(e) => {
                    setErr('');
                    setAdresse(e.target.value);
                    handleErr(e);
                  }}
                  value={adresse}
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="">Téléphone</label>
                <input
                  style={{ marginBottom: '.5em' }}
                  id="telephone"
                  onChange={(e) => {
                    setErr('');
                    setTelephone(e.target.value);
                    handleErr(e);
                  }}
                  onFocus={(e) => {
                    setValidPhone(true);
                  }}
                  value={telephone}
                  type="text"
                />
                {!validPhone && (
                  <p className="err">
                    Ce numéro de telephone est invalide !
                  </p>
                )}
              </div>
            </div>
            <div className="form-flex">
              <div>
                <label htmlFor="">Wilaya</label>
                <input
                  id="wilaya"
                  onChange={(e) => {
                    setErr('');
                    handleErr(e);
                    setWilaya(e.target.value);
                  }}
                  value={wilaya}
                  type="text"
                />
              </div>
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
            </div>
            <div className="form-flex">
              <div>
                <label htmlFor="">Mot de pass</label>
                <input
                  id="password"
                  onChange={(e) => {
                    setErr('');
                    setPassword(e.target.value);
                    handleErr(e);
                  }}
                  value={password}
                  type="text"
                />
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
                  setValidPhone(phoneExp.test(telephone));
                  setValidEmail(emailExp.test(email));
                  if (
                    phoneExp.test(telephone) &&
                    emailExp.test(email) &&
                    empty.length === 0 &&
                    !err
                  ) {
                    handleAdd();
                  }
                }}
              >
                Ajouter
              </button>
            </div>
          </form>
        ) : (
          <form>
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
              <div>
                <label htmlFor="">Mot de pass</label>
                <input
                  id="password"
                  onChange={(e) => {
                    setErr('');
                    setPassword(e.target.value);
                    handleErr(e);
                  }}
                  value={password}
                  type="text"
                />
              </div>
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
                    handleAdd();
                  }
                }}
              >
                Ajouter
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default AddUser;
