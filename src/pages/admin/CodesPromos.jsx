import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect, memo } from 'react';
import { BsTrash } from 'react-icons/bs';
import Dialog from '../../components/Dialog';
const CodesPromos = () => {
  const [code, setCode] = useState();
  const [dateFin, setDateFin] = useState();
  const [empty, setEmpty] = useState(['nom', 'date', 'percentage']);
  const [codes, setCodes] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [deletedId, setDeletedId] = useState();
  const [err, setErr] = useState('');
  const [dialogCode, setDialogCode] = useState(false);
  const [deletedCode, setDeletedCode] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://mystorify-api.cyclic.app/api/magasins/codesPromos`
      )
      .then((res) => {
        console.log(res.data);
        setCodes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const id = deletedId;
    if (deletedCode === true) {
      axios
        .delete(
          `https://mystorify-api.cyclic.app/api/magasins/codesPromos/${id}`
        )
        .then((res) => {
          console.log(res);
          //navigate('/dashboard/admin/products');
          setCodes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [deletedCode]);
  const addCode = () => {
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/magasins/codesPromos/add`,
        {
          code,
          dateFin,
          percentage,
        }
      )
      .then((res) => {
        console.log(res.data);
        setCodes(res.data);
      })
      .catch((err) => console.log(err));
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
    setCode('');
    setDateFin('');
    setPercentage(0);
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
    setErr('');
  };
  return (
    <div className="dash-content ">
      <div className="edit-profile">
        <div className="head">
          <h2> Ajouter et counsulter la liste des codes promos</h2>
          <p
            onClick={() => {
              const date = new Date(dateFin);
            }}
          >
            Ajouter un code ci dessus :
          </p>
        </div>
        <div className="form-flex" style={{ alignItems: 'center' }}>
          <div>
            <label>Nom du code</label>
            <input
              id="nom"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                handleErr(e);
              }}
            />
          </div>
          <div>
            <label>Date Fin</label>
            <input
              id="date"
              type="date"
              value={dateFin}
              onChange={(e) => {
                setDateFin(e.target.value);
                handleErr(e);
              }}
            />
          </div>
          <div>
            <label>Percentage</label>
            <input
              id="percentage"
              type="number"
              min="0"
              max="100"
              step="1"
              value={percentage}
              onChange={(e) => {
                setPercentage(e.target.value);
                handleErr(e);
              }}
            />
          </div>
        </div>

        <div className="form-flex">
          <div></div>
        </div>
        <div className="form-flex">
          <div>
            {codes?.length !== 0 && (
              <div style={{ color: '#3B4C68' }}>
                <h3>List des codes promos : </h3>
                <ul
                  style={{ paddingLeft: '1.5em', fontWeight: '500' }}
                >
                  {codes?.map((codePromo) => {
                    return (
                      <li
                        style={{
                          marginBlock: '.5em',
                          listStyle: 'initial',
                        }}
                      >
                        {codePromo?.nom}
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
                            <p>
                              Percentage : {codePromo?.percentage}%
                            </p>
                            <p>
                              Date Fin :{' '}
                              {codePromo?.data_fin.split('T')[0]}
                            </p>
                          </div>
                          <BsTrash
                            style={{
                              color: '#ed4337',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              setDeletedId(codePromo.id);
                              setDialogCode(true);
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div
        className="btns"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1em',
        }}
      >
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
              addCode();
            }
          }}
        >
          Ajouter
        </button>
      </div>
      {dialogCode && (
        <Dialog
          text1="Est ce que vous-avez sur ?"
          setDialogCode={setDialogCode}
          setDeletedCode={setDeletedCode}
        />
      )}
    </div>
  );
};
export default CodesPromos;
