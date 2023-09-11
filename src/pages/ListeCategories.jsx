import { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineFileDownloadDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import Dialog from '../components/Dialog';

const ListeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategoires] = useState([]);
  const [dropdownCata, setDropdownCata] = useState(false);
  const [categorieNom, setCategorieNom] = useState();
  const [categorieDesc, setCategorieDesc] = useState();
  const [categorieId, setCategorieId] = useState(null);
  const [sousId, setSousId] = useState(null);
  const [editing, setEditing] = useState();
  const [editingSous, setEditingSous] = useState();
  const [nom, setNom] = useState();
  const [desc, setDesc] = useState('');
  const [nomAdd, setNomAdd] = useState('');
  const [descAdd, setDescAdd] = useState('');
  const [err, setErr] = useState('');
  const [errDialog, setErrDialog] = useState('');
  const [empty, setEmpty] = useState(['desc', 'nom']);
  const [deletedCate, setDeletedCate] = useState(false);
  const [deletedSous, setDeletedSous] = useState(false);
  const [dialogCate, setDialogCate] = useState(false);
  const [dialogSous, setDialogSous] = useState(false);

  useEffect(() => {
    axios
      .get(`https://mystorify-api.cyclic.app/api/categories/`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
        setSousCategoires(res.data[0]?.Sous_Categorie);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setCategorieNom(categories[0]?.nom);
    setCategorieId(categories[0]?.id);
    setCategorieDesc(categories[0]?.description);
  }, [categories]);

  useEffect(() => {
    if (deletedCate === true) {
      const id = categorieId;
      axios
        .delete(
          `https://mystorify-api.cyclic.app/api/categories/${id}`
        )
        .then((res) => {
          console.log(res.data);
          setCategories(
            res.data,
            setSousCategoires(categories[0]?.Sous_Categorie)
          );
          setDeletedCate(false);
        })
        .catch((err) => {
          console.log(err);
          setDialogCate(true);
          setErrDialog(err.response.data.message);
          setDeletedCate(false);
        });
    } else if (deletedSous === true) {
      const id = sousId;
      console.log(categorieId);
      axios
        .post(
          `https://mystorify-api.cyclic.app/api/categories/sous/${id}`,
          {
            categorieId,
          }
        )
        .then((res) => {
          console.log(res.data);

          setSousCategoires(res.data);
          setDeletedSous(false);
        })
        .catch((err) => {
          console.log(err);
          setDialogSous(true);
          setErrDialog(err.response.data.message);
          setDeletedSous(false);
        });
    }
  }, [deletedCate, deletedSous]);
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
    setNomAdd('');
    setDescAdd('');
    setEmpty(['desc', 'nom']);
    setErr(false);
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
  };
  const updateCate = (id) => {
    axios
      .patch(
        `https://mystorify-api.cyclic.app/api/categories/${id}`,
        {
          nom,
          desc,
        }
      )

      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };
  const updateSousCate = (id) => {
    axios
      .patch(
        `https://mystorify-api.cyclic.app/api/categories/sous/${id}`,
        {
          nom,
          desc,
          categorieId,
        }
      )

      .then((res) => {
        console.log(res.data);
        setSousCategoires(res.data);
      })
      .catch((err) => console.log(err));
  };
  const addSousCate = () => {
    axios
      .post(`https://mystorify-api.cyclic.app/api/categories/sous/`, {
        nomAdd,
        descAdd,
        categorieId,
      })

      .then((res) => {
        console.log(res.data);
        setSousCategoires(res.data);
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  };
  return (
    <div className="dash-content">
      <div className="edit-profile">
        <h2>Consulter et modifier les catégories</h2>
        <div className="form-flex">
          <button className="btn">
            <Link
              to={`/dashboard/admin/categories/add`}
              style={{ color: 'white' }}
            >
              Ajouter une catégorie
            </Link>
          </button>
        </div>
      </div>
      <div className="form-flex">
        <div>
          <label>Catégorie </label>
          <div
            className="dropdown"
            style={{ zIndex: '5', marginBlock: '.5em' }}
          >
            <button
              style={{ marginBlock: '0' }}
              onClick={(e) => {
                e.preventDefault();
                setDropdownCata((current) => !current);
                setEditing(false);
                setEditingSous(false);
              }}
              className={dropdownCata ? 'dropdown-open' : undefined}
            >
              {categorieNom}
              <IoIosArrowDown
                className={
                  !dropdownCata
                    ? 'arrow-down'
                    : 'arrow-down arrow-down-rotated'
                }
              />
            </button>
            <AnimatePresence>
              {dropdownCata && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="dropdown-methods"
                >
                  {categories?.map((cate) => {
                    return (
                      <li
                        onClick={() => {
                          setSousCategoires(cate?.Sous_Categorie);
                          setCategorieNom(cate?.nom);
                          setCategorieDesc(cate?.desc);
                          setCategorieId(cate.id);
                          setEditing(false);
                          setEditingSous(false);
                          setDropdownCata(false);
                        }}
                      >
                        {cate.nom}
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
      <div
        className="form-flex"
        style={{ color: '#3B4C68', gap: '1em', alignItems: 'center' }}
      >
        {editing === true ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1em',
            }}
          >
            <div className="edit-profile" style={{}}>
              <div>
                <input
                  onChange={(e) => {
                    setNom(e.target.value);
                  }}
                  value={nom}
                  type="text"
                />
              </div>
              <div>
                <textarea
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  value={desc}
                  type="text"
                  style={{ height: '120px' }}
                ></textarea>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
              }}
            >
              <MdOutlineFileDownloadDone
                size={23}
                onClick={() => {
                  setEditing(false);
                  updateCate(categorieId);
                }}
                style={{ cursor: 'pointer' }}
              />
              <RxCross1
                size={23}
                onClick={() => {
                  setEditing(false);
                  setNom('');
                  setDesc('');
                }}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        ) : (
          <>
            <div>
              <h4>{categorieNom} : </h4>
              <p
                style={{
                  marginTop: '.5em',
                  marginLeft: '1em',
                }}
              >
                {categorieDesc}{' '}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
              }}
            >
              <AiOutlineEdit
                size={23}
                onClick={() => {
                  setEditingSous(false);
                  setEditing(true);
                  setNom(categorieNom);
                  setDesc(categorieDesc);
                }}
                style={{ cursor: 'pointer' }}
              />
              <BsTrash
                color="red"
                size={20}
                onClick={() => {
                  setDeletedCate(true);
                }}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </>
        )}
      </div>
      <h3 style={{ marginTop: '2em' }}>
        List des sous catégorie de {categorieNom}{' '}
      </h3>

      {sousCategories?.map((sousCate) => {
        return (
          <div
            className="form-flex"
            style={{
              color: '#3B4C68',
              gap: '1em',
              alignItems: 'center',
            }}
          >
            {editingSous === sousCate.id ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1em',
                }}
              >
                <div className="edit-profile" style={{}}>
                  <div>
                    <input
                      onChange={(e) => {
                        setNom(e.target.value);
                      }}
                      value={nom}
                      type="text"
                    />
                  </div>
                  <div>
                    <textarea
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      value={desc}
                      type="text"
                      style={{ height: '120px' }}
                    ></textarea>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1em',
                  }}
                >
                  <MdOutlineFileDownloadDone
                    size={23}
                    onClick={() => {
                      setEditingSous(false);
                      updateSousCate(sousCate?.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <RxCross1
                    size={23}
                    onClick={() => {
                      setEditingSous(false);
                      setNom('');
                      setDesc('');
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h4>{sousCate?.nom} : </h4>
                  <p
                    style={{
                      marginTop: '.5em',
                      marginLeft: '1em',
                    }}
                  >
                    {sousCate?.description}{' '}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1em',
                  }}
                >
                  <AiOutlineEdit
                    size={23}
                    onClick={() => {
                      setEditing(false);
                      setEditingSous(sousCate?.id);
                      setNom(sousCate?.nom);
                      setDesc(sousCate?.description);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <BsTrash
                    color="red"
                    size={20}
                    onClick={() => {
                      setSousId(sousCate?.id);
                      setDeletedSous(true);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </>
            )}
          </div>
        );
      })}

      <div></div>
      <div className="edit-profile">
        <h2>Ajouter une sous catégorie de {categorieNom}</h2>{' '}
        <p style={{ color: '#3B4C68', marginBottom: '1em' }}>
          Remplire la formulaire ci dessus
        </p>
        <div className="form-flex">
          <div>
            <label>Nom de catégorie </label>
            <input
              id="nom"
              type="text"
              value={nomAdd}
              onChange={(e) => {
                setNomAdd(e.target.value);
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
              value={descAdd}
              onChange={(e) => {
                setDescAdd(e.target.value);
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
                addSousCate();
              }
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
      {dialogCate && (
        <Dialog
          setDialogCate={setDialogCate}
          setDeleted={setDeletedCate}
          text1={errDialog}
          close={true}
          singleBtn={true}
        />
      )}
      {dialogSous && (
        <Dialog
          setDialogCate={setDialogSous}
          setDeleted={setDeletedSous}
          text1={errDialog}
          close={true}
          singleBtn={true}
        />
      )}
    </div>
  );
};
export default ListeCategories;
