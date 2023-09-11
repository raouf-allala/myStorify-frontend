import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authUpdate } from '../features/auth/authSlice';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import Dialog from '../components/Dialog';

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState();
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [validEmail, setValidEmail] = useState(true);
  const [empty, setEmpty] = useState([]);
  const [adresse, setAdresse] = useState();
  const [wilaya, setWilaya] = useState();
  const [credit, setCredit] = useState();
  const phoneExp = /^[0-9]{9,10}$/;
  const [validPhone, setValidPhone] = useState(true);
  const [err, setErr] = useState('');
  const [date, setDate] = useState([]);
  const [dialogUser, setDialogUser] = useState(false);
  const [deletedUser, setDeletedUser] = useState(false);
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
    setValidEmail(true);
  };
  useEffect(() => {
    if (deletedUser === true) {
      axios
        .delete(
          `https://mystorify-api.cyclic.app/api/users/delete/${id}`
        )
        .then((res) => {
          console.log(res);
          navigate('/dashboard/admin/users');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [deletedUser]);
  useEffect(() => {
    axios
      .get(
        `https://mystorify-api.cyclic.app/api/users/dash/admin/${id}`
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setDate(res.data?.createdAt?.split('T'));
        setNom(res.data.nom);
        setPrenom(res.data.prenom);
        setEmail(res.data.email);
        setAdresse(res.data.adresse);
        setTelephone(res.data.telephone);
        setWilaya(res.data.wilaya);
        setCredit(res.data.credit);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleUpdate = () => {
    const updatedUser = {
      id: user.id,
      nom,
      prenom,
      email,
      adresse,
      telephone,
      wilaya,
      credit,
    };
    axios
      .patch(
        'https://mystorify-api.cyclic.app/api/users/admin/update',
        updatedUser,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate('/dashboard/admin/users');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="dash-content">
      <div className="head">
        <h2>Voir et modifier les information de cet utilisateur</h2>

        <p>
          Ce compte a été crée le {date[0]} à{' '}
          {date[1]?.substring(0, 8)}
        </p>
      </div>
      <div className="edit-profile">
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
            <div>
              <label htmlFor="">Adresse email</label>
              <input
                id="eamil"
                onChange={(e) => {
                  handleErr(e);
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
              <label htmlFor="">Crédit</label>
              <input
                id="credit"
                onChange={(e) => {
                  setCredit(e.target.value);
                  handleErr(e);
                }}
                value={credit}
                type="text"
              />
            </div>
            <div></div>
          </div>
          {user?.Magasin.length !== 0 && (
            <div className="form-flex" style={{ color: '#3B4C68' }}>
              <div>
                <h3>Les magasins de cet utilisateur</h3>
                <ul
                  style={{ paddingLeft: '1.5em', fontWeight: '500' }}
                >
                  {user?.Magasin?.map((magasin) => {
                    return (
                      <li
                        style={{
                          marginBlock: '.5em',
                          listStyle: 'initial',
                        }}
                      >
                        {magasin?.nom}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          <div
            className="btns"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <button
                className="btn"
                style={{
                  backgroundColor: 'red',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5em',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setDialogUser(true);
                }}
              >
                <BsTrash />
                Supprimer
              </button>
            </div>
            <div style={{ display: 'flex', gap: '1em' }}>
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
          </div>
        </form>
        {dialogUser && (
          <Dialog
            text1="Est ce que vous-avez sur ?"
            setDialogUser={setDialogUser}
            setDeletedUser={setDeletedUser}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
