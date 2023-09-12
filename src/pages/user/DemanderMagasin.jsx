import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const DemanderMagasin = () => {
  const [nom, setNom] = useState('');
  const [desc, setDesc] = useState('');
  const [logo, setLogo] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [depots, setDepot] = useState([
    {
      nom: 'depot 1',
      wilaya: 'constantine',
      adresse: 'adresse 1',
    },
    {
      nom: 'depot 2',
      wilaya: 'constantine',
      adresse: 'adresse 2',
    },
  ]);
  const [registre, setRegistre] = useState('');
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    TransformLogo(file);
  };
  const TransformLogo = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLogo(reader.result);
      };
    } else {
      setLogo('');
    }
  };
  const handleRegistreUpload = (e) => {
    const file = e.target.files[0];
    TransformRegistre(file);
  };
  const TransformRegistre = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setRegistre(reader.result);
      };
    } else {
      setRegistre('');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const magasin = {
      nom,
      desc,
      logo,
      registre,
      categorieId: 1,
      Depot: depots,
      utilisateurId: user.id,
    };
    console.log(magasin);
    axios
      .post('https://mystorify-api.cyclic.app/api/magasins', magasin)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            name="nom"
            id="nom"
            onChange={(e) => {
              setNom(e.target.value);
            }}
          />
          <label htmlFor="desc">Description :</label>
          <input
            type="text"
            name="desc"
            id="desc"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <label htmlFor="logo">Logo :</label>
          <input
            type="file"
            name="logo"
            id="logo"
            onChange={(e) => {
              handleLogoUpload(e);
            }}
          />
          <label htmlFor="register_commerce">
            Registre De Commerce :
          </label>
          <input
            type="file"
            name="register_commerce"
            id="register_commerce"
            onChange={(e) => {
              handleRegistreUpload(e);
            }}
          />
          <button className="btn" type="submit">
            submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default DemanderMagasin;
