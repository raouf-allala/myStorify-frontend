import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authUpdate } from '../../features/auth/authSlice';
import Successs from '../../components/Success';

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [nom, setNom] = useState(user?.nom);
  const [prenom, setPrenom] = useState(user?.prenom);
  const [email, setEmail] = useState(user?.email);
  const [telephone, setTelephone] = useState(0 + user?.telephone);
  const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [validEmail, setValidEmail] = useState(true);
  const [done, setDone] = useState();
  const [empty, setEmpty] = useState([]);
  const [adresse, setAdresse] = useState(user?.adresse);
  const [wilaya, setWilaya] = useState(user?.wilaya);
  const phoneExp = /^[0-9]{9,10}$/;
  const [validPhone, setValidPhone] = useState(true);
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
    setNom(user.nom);
    setPrenom(user.prenom);
    setEmail(user.email);
    setAdresse(user.adresse);
    setTelephone(user.telephone);
    setWilaya(user.wilaya);
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
    setErr('');
    setValidPhone(true);
  };
  const handleUpdate = () => {
    const updatedUser = {
      id: user.id,
      nom,
      prenom,
      email,
      adresse,
      telephone,
      wilaya,
    };
    axios
      .patch(
        'https://mystorify-api.cyclic.app/api/users/update',
        updatedUser,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(authUpdate(res.data));
        setDone(true);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="right">
      {!done ? (
        <>
          <h2>Modifier Votre Profile</h2>
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
                    handleErr(e);
                    setWilaya(e.target.value);
                    handleErr(e);
                  }}
                  value={wilaya}
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
                    handleUpdate();
                  }
                }}
              >
                Sauvgarder
              </button>
            </div>
          </form>
        </>
      ) : (
        <Successs message="Votre compte a été modifié avec succès !" />
      )}
    </div>
  );
};

export default EditProfile;
