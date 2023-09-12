import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { VscReport } from 'react-icons/vsc';
import Successs from '../../components/Success';
const Report = () => {
  const [desc, setDesc] = useState('');
  const [titre, setTitre] = useState('');
  const [type, setType] = useState('bug');
  const [empty, setEmpty] = useState(['titre', 'desc']);
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
  const handleReset = () => {
    setEmpty(['desc', 'titre']);
    setDesc('');
    setTitre('');
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
  };
  const handleSubmit = () => {
    axios
      .post(
        'https://mystorify-api.cyclic.app/api/users/report',
        { titre, desc, type },
        {
          withCredentials: true,
        }
      )
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
                      <VscReport className="icon" />
                    </div>
                    <h3>Appelez-nous </h3>
                  </div>
                  <p>Nous sommes disponibles 24h/24, 7j/7.</p>
                  <p>Téléphone : 05 59 52 33 21</p>
                </div>
                <div>
                  <div className="head">
                    <div className="icon-wrapper">
                      <VscReport className="icon" />
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
                    <label htmlFor="">Titre</label>
                    <div className="form-flex">
                      <div>
                        <input
                          id="titre"
                          onChange={(e) => {
                            setTitre(e.target.value);
                            handleErr(e);
                          }}
                          placeholder="Titre"
                          type="text"
                          value={titre}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1em',
                        }}
                      >
                        <label>Bug</label>
                        <input
                          type="radio"
                          name="type"
                          value="bug"
                          id="type"
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
                          style={{ margin: '0', width: 'auto' }}
                          checked={type === 'bug'}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1em',
                        }}
                      >
                        <label>Personnel</label>
                        <input
                          type="radio"
                          name="type"
                          value="personnel"
                          id="type"
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
                          style={{ margin: '0', width: 'auto' }}
                          checked={type === 'personnel'}
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
                          if (empty.length === 0) {
                            handleSubmit();
                          }
                        }}
                      >
                        Envoyer
                      </button>
                    </div>
                  </form>
                ) : (
                  <Successs message="Reclamation Envoyé Avec Succès" />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Report;
