import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategorie = () => {
  const [nom, setNom] = useState('');
  const [desc, setDesc] = useState('');
  const [err, setErr] = useState('');
  const [empty, setEmpty] = useState(['desc', 'nom']);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post('https://mystorify-api.cyclic.app/api/categories/', {
        nom,
        desc,
      })
      .then((res) => {
        console.log(res);
        navigate(`/dashboard/admin/categories`);
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  };
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
    setDesc('');
    setEmpty(['desc', 'nom']);
    setErr(false);
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
  };
  return (
    <div className="dash-content">
      <div className="edit-profile">
        <h2>Consulter et modifier les catégories</h2>{' '}
        <p style={{ color: '#3B4C68', marginBottom: '1em' }}>
          Remplire la formulaire ci dessus
        </p>
        <div className="form-flex">
          <div>
            <label>Nom de catégorie </label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => {
                setNom(e.target.value);
                handleErr(e);
              }}
              onFocus={() => {
                setErr('');
              }}
            />
            {err && <p className="err">{err}</p>}
          </div>
        </div>
        <div className="form-flex">
          <div>
            <label>Déscription </label>
            <textarea
              id="desc"
              type="text"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
                handleErr(e);
              }}
              onFocus={() => {
                setErr('');
              }}
            ></textarea>
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
              if (empty.length === 0 && !err) {
                handleSubmit();
              }
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddCategorie;
