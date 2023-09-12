import axios from 'axios';

import { useState, useRef, useEffect, memo } from 'react';

import { RxCross1 } from 'react-icons/rx';
import {
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useDispatch } from 'react-redux';
import { authUpdate } from '../../features/auth/authSlice';
import { BsTrash } from 'react-icons/bs';

import Dialog from '../../components/Dialog';
const EditMagasin = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const inputRefLogo = useRef(null);
  const navigate = useNavigate();
  const { magasinId } = useParams();
  const [depots, setDepots] = useState();
  const [depot, setDepot] = useState({
    nom: '',
    wilaya: '',
    adresse: '',
  });
  const [categories, setCategories] = useState();
  const [categorie, setCategorie] = useState();

  const [nom, setNom] = useState('');
  const [desc, setDesc] = useState('');
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState([]);
  const [date, setDate] = useState([]);
  const [deletedDepot, setDeletedDepot] = useState(false);
  const [deletedMagasin, setDeletedMagasin] = useState(false);
  const [dialogDepot, setDialogDepot] = useState(false);
  const [dialogMagasin, setDialogMagasin] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [deletedDepotId, setDeletedDepotId] = useState();
  const [magasin, setMagasin] = useState();
  const [logo, setLogo] = useState();
  useEffect(() => {
    axios
      .get('https://mystorify-api.cyclic.app/api/categories')
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const id = magasinId;
    axios
      .get(`https://mystorify-api.cyclic.app/api/magasins/${id}`)
      .then((res) => {
        console.log(res.data);
        setMagasin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setCategorie(magasin?.Categorie);
    setDepots(magasin?.Depot);
    setDate(magasin?.createdAt.split('T'));
    setNom(magasin?.nom);
    setDesc(magasin?.description);
    setLogo(magasin?.logo);
  }, [magasin]);

  useEffect(() => {
    if (depot.adresse && depot.wilaya && depot.nom)
      ref.current.disabled = false;
    else ref.current.disabled = true;
  }, [depot.adresse, depot.wilaya, depot.nom]);
  useEffect(() => {
    if (deletedDepot === true) {
      const id = deletedDepotId;
      axios
        .delete(
          `https://mystorify-api.cyclic.app/api/magasins/depot/delete/${id}`
        )
        .then((res) => {
          console.log(res.data);
          setDepots((currents) => {
            return currents.filter(
              (current) => current.id !== res.data.id
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (deletedMagasin === true) {
      const id = magasin.id;
      const email = magasin?.Utilisateur?.email;
      console.log(magasin?.Utilisateur?.email);
      axios
        .post(
          `https://mystorify-api.cyclic.app/api/magasins/delete/${id}`,
          {
            email,
          }
        )
        .then((res) => {
          console.log(res.data);
          dispatch(authUpdate(res.data));
          navigate(`/`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [deletedDepot, deletedMagasin]);

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
  const handleOnSubmit = (e) => {
    e.preventDefault();

    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '#ed4337';
    });
    console.log(empty);
  };

  const handleReset = () => {
    setNom(magasin?.nom);
    setDesc(magasin?.description);
    setLogo(magasin?.logo);
    setErr(false);
    setDropdownCata(false);
    setDropdownDepot(false);

    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
    setEmpty([]);
  };
  const addDepot = () => {
    const magasinId = magasin?.id;
    axios
      .post(
        'https://mystorify-api.cyclic.app/api/magasins/depot/add',
        {
          magasinId,
          depot,
        }
      )
      .then((res) => {
        console.log(res);
        setDepots(res.data);
        setDepot({ nom: '', wilaya: '', adresse: '' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    const categorieId = categorie?.id;
    setIsLoading(true);

    axios
      .patch(
        `https://mystorify-api.cyclic.app/api/magasins/${magasin.id}`,
        {
          nom,
          desc,
          categorieId,
          logo,
        }
      )
      .then((res) => {
        console.log(res);
        navigate(`/dashboard/magasin/${magasin.id}/products`);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="dash-content">
      <div className="head">
        <h2>Voir et modifier le details de votre magasin</h2>
        <div
          className="form-flex"
          style={{
            justifyContent: 'space-between',
          }}
        >
          <p onClick={() => console.log(depots)}>
            Ce magasin a été crée le {date && date[0]} à{' '}
            {date && date[1]?.substring(0, 8)}
          </p>
        </div>
      </div>
      <div className="edit-profile">
        <div className="form-flex">
          <div>
            <label>Nom du magasin </label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => {
                setNom(e.target.value);
                handleErr(e);
              }}
            />
          </div>
        </div>
        <div className="form-flex">
          <div>
            <label>Description </label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
                handleErr(e);
              }}
              style={{ height: '15vh' }}
            ></textarea>
          </div>
        </div>

        <div className="form-flex">
          <div>
            <label htmlFor=""> Logo</label>
            {logo && (
              <div
                className="add-product-image"
                style={{
                  width: '200px',
                  height: '200px',
                  marginTop: '.5em',
                }}
              >
                <div className="add-product-image-preview">
                  <img
                    src={logo}
                    alt="Product Image"
                    style={{
                      aspectRatio: '2/3',
                      objectFit: 'contain',
                    }}
                  />
                  <button
                    className="add-product-image-delete"
                    onClick={() => {
                      setLogo('');
                      setErr('');
                    }}
                  >
                    <RxCross1 className="icon" size={17} />
                  </button>
                </div>
              </div>
            )}

            {!logo && (
              <>
                <div
                  className="add-product-image"
                  style={{
                    marginTop: '.5em',
                    width: '200px',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    className="add-product-image-overlay"
                    onClick={() => {
                      inputRefLogo.current.click();
                    }}
                  >
                    <span className="add-product-image-overlay-icon">
                      +
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRefLogo}
                    style={{ display: 'none' }}
                    onChange={handleLogoUpload}
                  />
                </div>
              </>
            )}
          </div>
          <div style={{ color: '#3B4C68' }}>
            <h4>
              Les sous catégories de votre catégorie ({categorie?.nom}
              ) :
            </h4>
            <ul style={{ paddingLeft: '1.5em' }}>
              {categorie?.Sous_Categorie?.map((cat) => {
                return (
                  <li
                    style={{
                      marginBlock: '.5em',

                      listStyle: 'initial',
                    }}
                  >
                    {cat.nom}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="form-flex">
          <div>
            <label htmlFor="">Nom du dépot</label>
            <input
              value={depot.nom}
              type="text"
              style={{ marginBottom: '1em' }}
              onChange={(e) => {
                setDepot({ ...depot, nom: e.target.value });
              }}
            />
            <label htmlFor="">Wilaya</label>
            <input
              value={depot.wilaya}
              type="text"
              style={{ marginBottom: '1em' }}
              onChange={(e) => {
                setDepot({ ...depot, wilaya: e.target.value });
              }}
            />
            <label htmlFor="">Adresse</label>
            <input
              value={depot.adresse}
              type="text"
              style={{ marginBottom: '1em' }}
              onChange={(e) => {
                setDepot({ ...depot, adresse: e.target.value });
              }}
            />

            <button
              className="btn"
              ref={ref}
              onClick={(e) => {
                addDepot(e);
              }}
            >
              Ajouter un dépot
            </button>
          </div>
          <div>
            <div style={{ color: '#3B4C68' }}>
              <h4>Les dépots de cette magasin : </h4>

              <ul style={{ paddingLeft: '1.5em', fontWeight: '500' }}>
                {depots?.map((depot) => {
                  return (
                    <li
                      style={{
                        marginBlock: '.5em',
                        listStyle: 'initial',
                      }}
                    >
                      {depot?.nom}
                      <div
                        style={{
                          fontWeight: 'lighter',
                          marginLeft: '1em',
                          marginTop: '.3em',
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingRight: '1em',
                        }}
                      >
                        <div>
                          <p>Wilaya : {depot?.wilaya}</p>
                          <p>Adresse : {depot?.adresse}</p>
                        </div>
                        <BsTrash
                          style={{
                            color: '#ed4337',
                            cursor: 'pointer',
                          }}
                          onClick={(e) => {
                            setDeletedDepotId(depot.id);
                            setDialogDepot(true);
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
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
                setDialogMagasin(true);
              }}
            >
              <BsTrash />
              Supprimer
            </button>
          </div>
          <div style={{ display: 'flex', gap: '2em' }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
              className="btn btn-sec"
            >
              Réinitialiser
            </button>
            {!isLoading ? (
              <button
                className="btn"
                onClick={(e) => {
                  handleOnSubmit(e);
                  console.log(err);
                  if (empty.length === 0 && !err) {
                    handleSubmit();
                  }
                }}
              >
                Sauvgarder
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="btn"
              >
                <Spinner />
              </button>
            )}
          </div>
        </div>
        {dialogDepot && (
          <Dialog
            setDialogDepot={setDialogDepot}
            setDeletedDepot={setDeletedDepot}
            text1="Toutes les produits dans ce dépot sera supprimer."
            text2="Est ce que vous avez sur?"
            close={true}
          />
        )}
        {dialogMagasin && (
          <Dialog
            setDialogMagasin={setDialogMagasin}
            setDeletedMagasin={setDeletedMagasin}
            text1="Toutes les produits dans ce magasin sera supprimer."
            text2="Est ce que vous avez sur?"
            close={true}
          />
        )}
      </div>
    </div>
  );
};

export default EditMagasin;
