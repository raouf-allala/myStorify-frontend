import { useState } from 'react';
import Picture from '../../assets/Login image.jpg';
import Google from '../../assets/Google.png';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
const RegisterPage = () => {
  const [showNext, setShowNext] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [done, setDone] = useState(false);
  const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneExp = /^[0-9]{9,10}$/;
  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [err, setErr] = useState('');

  const [emptyFirst, setEmptyFirst] = useState([
    'nom',
    'prenom',
    'email',
    'password',
  ]);
  const [emptySec, setEmptySec] = useState([
    'telephone',
    'adresse',
    'wilaya',
  ]);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleErrFirst = (e) => {
    if (e.target.value.trim() === '') {
      setEmptyFirst((current) => [...current, e.target.id]);
    }
    if (emptyFirst.length !== 0 && e.target.value.trim() !== '') {
      if (emptyFirst.indexOf(e.target.id) > -1) {
        emptyFirst.splice(emptyFirst.indexOf(e.target.id), 1);
        console.log(e.target.id);
        e.target.style.borderColor = 'black';
      }
    }
  };
  const handleErrSec = (e) => {
    if (e.target.value.trim() === '') {
      setEmptySec((current) => [...current, e.target.id]);
    }
    if (emptySec.length !== 0 && e.target.value.trim() !== '') {
      if (emptySec.indexOf(e.target.id) > -1) {
        emptySec.splice(emptySec.indexOf(e.target.id), 1);
        console.log(e.target.id);
        e.target.style.borderColor = 'black';
      }
    }
  };
  const handleOnSuivant = (e) => {
    e.preventDefault();
    emptyFirst.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '#ed4337';
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emptySec.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '#ed4337';
    });
  };

  const handleRegister = () => {
    const user = {
      nom,
      prenom,
      email,
      password,
      telephone,
      adresse,
      wilaya,
    };

    axios
      .post(
        'https://mystorify-api.cyclic.app/api/users/registre',
        user,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setDone(true);
      })
      .catch((err) => {
        setErr(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  console.log(phoneExp.test(telephone));
  return (
    <main>
      <div className="container">
        <div className="login-flex">
          <div className="left">
            <img src={Picture} alt="" />
          </div>
          <div className="right inscrire">
            {!done && (
              <form className="right-content">
                <h1>Créer un compte</h1>
                <p>Entrez vos coordonnées ci-dessous</p>
                {err && <p className="err">{err}</p>}
                {!showNext && (
                  <>
                    <input
                      id="nom"
                      placeholder="Nom"
                      type="text"
                      className="login-input"
                      value={nom}
                      onChange={(e) => {
                        setNom(e.target.value);
                        handleErrFirst(e);
                      }}
                    />
                    <input
                      id="prenom"
                      placeholder="Prénom"
                      type="text"
                      className="login-input"
                      value={prenom}
                      onChange={(e) => {
                        setPrenom(e.target.value);
                        handleErrFirst(e);
                      }}
                    />
                    <input
                      id="email"
                      placeholder="Email"
                      type="text"
                      className="login-input"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleErrFirst(e);
                      }}
                      onFocus={() => setValidEmail(true)}
                    />
                    {!validEmail && (
                      <p className="err">
                        Cette Adresse email est invalide !
                      </p>
                    )}
                    <input
                      id="password"
                      placeholder="Password"
                      type="password"
                      className="login-input"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        handleErrFirst(e);
                      }}
                    />
                  </>
                )}
                {showNext && (
                  <>
                    <input
                      id="telephone"
                      placeholder="Telephone"
                      type="text"
                      className="login-input"
                      value={telephone}
                      onChange={(e) => {
                        setTelephone(e.target.value);
                        handleErrSec(e);
                      }}
                      onFocus={() => setValidPhone(true)}
                    />
                    {!validPhone ? (
                      <p className="err">
                        Ce numéro de telephone est invalide !
                      </p>
                    ) : (
                      ''
                    )}
                    <input
                      id="adresse"
                      placeholder="Adresse"
                      type="text"
                      value={adresse}
                      className="login-input"
                      onChange={(e) => {
                        setAdresse(e.target.value);
                        handleErrSec(e);
                      }}
                    />
                    <input
                      id="wilaya"
                      placeholder="Wilaya"
                      type="text"
                      value={wilaya}
                      className="login-input"
                      onChange={(e) => {
                        setWilaya(e.target.value);
                        handleErrSec(e);
                      }}
                    />
                  </>
                )}
                <div className="register-cta">
                  {!showNext ? (
                    <button
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOnSuivant(e);
                        if (!emailExp.test(email)) {
                          setValidEmail(false);
                        } else if (
                          emailExp.test(email) &&
                          emptyFirst.length === 0
                        )
                          setValidEmail(true, setShowNext(true));
                      }}
                    >
                      Suivant
                    </button>
                  ) : (
                    <div className="register-cta-next">
                      <button
                        className="btn btn-back"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowNext(false);
                          setErr(false);
                        }}
                      >
                        <MdKeyboardArrowLeft />
                      </button>
                      <button
                        className="btn submit"
                        onClick={(e) => {
                          console.log(phoneExp.test(telephone));
                          handleOnSubmit(e);
                          setValidPhone(phoneExp.test(telephone));
                          if (
                            phoneExp.test(telephone) &&
                            emptySec.length === 0 &&
                            !err
                          ) {
                            handleRegister();
                          }
                        }}
                      >
                        Inscrire
                      </button>
                    </div>
                  )}
                  <Link
                    className="btn btn-google"
                    to="https://mystorify-api.cyclic.app/api/users/auth/google/"
                  >
                    <img src={Google} alt="" />
                    <p>Inscrire avec Google</p>
                  </Link>
                  <p style={{ textAlign: 'center' }}>
                    Vous avez déjà un compte ?{' '}
                    <Link
                      style={{
                        color: 'black',
                        textDecoration: 'underline',
                        fontWeight: 500,
                      }}
                      to="/login"
                    >
                      Connecter
                    </Link>
                  </p>
                </div>
              </form>
            )}

            {done && (
              <div className="right-content">
                <h1>Créer un compte</h1>
                <p>Entrez vos coordonnées ci-dessous</p>
                <p className="email-sent">
                  Un email a éte envoyer a votre email address pour
                  confirmer !
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
