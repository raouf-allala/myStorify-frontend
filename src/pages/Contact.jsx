import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsTelephone } from 'react-icons/bs';
import { CiMail } from 'react-icons/ci';
import Successs from '../components/Success';

const Contact = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const [nom, setNom] = useState(`${user?.prenom} ${user?.nom}`);
  const [email, setEmail] = useState(user?.email);
  const [telephone, setTelephone] = useState(user?.telephone);
  const [desc, setDesc] = useState('');
  const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [empty, setEmpty] = useState(['desc']);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setEmpty(['nom', 'email', 'desc', 'telephone']);
      console.log(empty);
    }
  }, [isAuthenticated]);

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
    if (isAuthenticated) {
      setNom(`${user?.prenom} ${user?.nom}`);
      setEmail(user.email);
      setTelephone(user.telephone);
    } else {
      setNom('');
      setEmail('');
      setTelephone('');
      setEmpty(['nom', 'email', 'desc', 'telephone']);
    }
    setDesc('');
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
  };
  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/api/users/contactUs', {
        nom,
        desc,
      })
      .then((res) => {
        console.log(res.data);
        setDone(true);
      });
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="edit-profile">
            <div className="contact-flex">
              <div className="left">
                <div>
                  <div className="head">
                    <div className="icon-wrapper">
                      <BsTelephone className="icon" />
                    </div>
                    <h3>Appelez-nous </h3>
                  </div>
                  <p>Nous sommes disponibles 24h/24, 7j/7.</p>
                  <p>Téléphone : 05 59 52 33 21</p>
                </div>
                <div>
                  <div className="head">
                    <div className="icon-wrapper">
                      <CiMail className="icon" />
                    </div>
                    <h3>Écrivez-nous </h3>
                  </div>
                  <p>
                    Remplissez notre formulaire et nous vous
                    contacterons dans les 24 heures.
                  </p>
                  <p>Email : Skandarcron@gmail.com</p>
                </div>
              </div>
              <div className="right">
                {!done ? (
                  <form>
                    <div className="form-flex">
                      <div>
                        <label htmlFor="">Nom et Prénom</label>
                        <input
                          id="nom"
                          onChange={(e) => {
                            setNom(e.target.value);
                            handleErr(e);
                          }}
                          value={nom}
                          type="text"
                          placeholder="Nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Téléphone</label>
                        <input
                          style={{ marginBottom: '.5em' }}
                          id="telephone"
                          placeholder="Telephone"
                          onChange={(e) => {
                            setTelephone(e.target.value);
                            handleErr(e);
                          }}
                          value={telephone}
                          type="text"
                        />
                      </div>
                    </div>
                    <textarea
                      placeholder="Écrivez-nous ..."
                      style={{ marginBottom: '.5em' }}
                      id="desc"
                      onChange={(e) => {
                        setDesc(e.target.value);
                        handleErr(e);
                      }}
                      value={desc}
                    ></textarea>
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
                          if (
                            emailExp.test(email) &&
                            empty.length === 0
                          ) {
                            handleSubmit();
                          }
                        }}
                      >
                        Envoyer
                      </button>
                    </div>
                  </form>
                ) : (
                  <Successs message="E-mail Envoyé Avec Succès" />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Contact;
