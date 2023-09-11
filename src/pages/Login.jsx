import { useEffect, useState } from 'react';
import { login } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Picture from '../assets/Login image.jpg';
import Google from '../assets/Google.png';
const Login = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [validEmail, setValidEmail] = useState(true);
  const [err, setErr] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [empty, setEmpty] = useState(['email', 'password']);
  useEffect(() => {
    setErr(error);
  }, [error]);
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
    console.log(rememberMe);
  };

  const handleLogin = (e) =>
    new Promise((resolve, reject) => {
      e.preventDefault();
      dispatch(login({ email, password, rememberMe }));

      resolve();
    });

  if (isAuthenticated) {
    if (user?.adresse === undefined) {
      return <Navigate to="/dashboard/admin/users" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  return (
    <main>
      <div className="container">
        <div className="login-flex">
          <div className="left">
            <img src={Picture} alt="" />
          </div>
          <div className="right">
            <form className="right-content">
              <h1>Se connecter à Exclusive</h1>
              <p>Entrez vos coordonnées ci-dessous</p>
              {err && <p className="err">{err}</p>}
              <input
                id="email"
                placeholder="Email"
                type="text"
                className="login-input"
                onFocus={() => {
                  setValidEmail(true);
                  setErr('');
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleErr(e);
                  setValidEmail(true);
                  setErr('');
                }}
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
                onFocus={() => {
                  setValidEmail(true);
                  setErr('');
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleErr(e);
                  setValidEmail(true);
                  setErr('');
                }}
              />
              <div className="register-cta">
                <div className="login-cta">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5em',
                    }}
                  >
                    <input
                      type="checkbox"
                      name="rememberMe"
                      onClick={(e) => {
                        //handleCheck(e);
                        setRememberMe(e.target.checked);
                      }}
                      style={{ margin: '0', width: 'auto' }}
                    />
                    <label>Se souvenir</label>
                  </div>
                  <Link
                    to="/forgotPass"
                    className="btn btn-secondary"
                  >
                    Mot de pass oublié ?
                  </Link>
                </div>
                <button
                  className="btn"
                  onClick={(e) => {
                    handleOnSubmit(e);
                    setValidEmail(emailExp.test(email));
                    if (emailExp.test(email) && empty.length === 0)
                      handleLogin(e);
                  }}
                >
                  Login
                </button>
                <Link
                  className="btn btn-google"
                  onClick={() => {
                    localStorage.setItem('rememberMe', rememberMe);
                  }}
                  to="https://mystorify-api.cyclic.app/api/users/auth/google/"
                >
                  <img src={Google} alt="" />
                  <p>Inscrire avec Google</p>
                </Link>
                <p style={{ textAlign: 'center' }}>
                  vous n'avez pas de compte ?{' '}
                  <Link
                    style={{
                      color: 'black',
                      textDecoration: 'underline',
                      fontWeight: 500,
                    }}
                    to="/inscrire"
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
export default Login;
