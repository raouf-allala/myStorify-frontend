import axios from 'axios';
import { useState } from 'react';

const AjouterCom = ({ setOpenReview, productId, forceUpdate }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'https://mystorify-api.cyclic.app/api/produits/user/review',
        {
          productId,
          rating,
          title,
          desc,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setOpenReview(false);
        forceUpdate();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="dialog-wrapper">
      <div className="dialog" style={{ minWidth: 500 }}>
        <h2
          style={{
            fontWeight: '500',
            fontSize: '1.4rem',
            textAlign: 'center',
          }}
        >
          Ajouter Commentaire
        </h2>
        <form onSubmit={handleSubmit} style={{ paddingTop: '.3em' }}>
          <input
            className="review-input"
            type="number"
            min={0}
            max={5}
            placeholder="Etoiles (0-5)"
            required
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <input
            className="review-input"
            type="text"
            placeholder="Titre"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            className="review-input"
            type="text"
            placeholder="Description"
            required
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <div style={{ display: 'flex', marginTop: '1em' }}>
            <button type="submit" className="btn">
              Envoyer
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenReview(false);
              }}
              className="btn btn-sec"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjouterCom;
