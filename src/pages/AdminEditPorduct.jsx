import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect, memo } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import {
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Spinner from '../components/Spinner';
import { TiStarFullOutline } from 'react-icons/ti';
import Dialog from '../components/Dialog';
import { BsTrash } from 'react-icons/bs';

const AdminEditProduct = () => {
  const [dialogProduct, setDialogProduct] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState(false);
  const { productId } = useParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [categorieId, setCategorieId] = useState();
  const [depotId, setDepotId] = useState();
  const [nom, setNom] = useState('');
  const [depotNom, setDepotNom] = useState('');
  const [categorieNom, setCategorieNom] = useState('');
  const [desc, setDesc] = useState('');
  const [prix, setPrix] = useState();
  const [quantity, setQuantity] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState([]);
  const [product, setProduct] = useState();
  const [date, setDate] = useState([]);
  const calcAvg = () => {
    let total = 0;
    let count = 0;
    product.Review.forEach((review) => {
      total += review.evaluation;
      count++;
    });
    if (count == 0) {
      return 0;
    }
    return total / count;
  };
  useEffect(() => {
    axios
      .get(
        `https://mystorify-api.cyclic.app/api/produits/${productId}`
      )
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setNom(res.data.nom);
        setDesc(res.data.description);
        setPrix(res.data.prix);
        setQuantity(res.data.quantity);

        setDate(res.data.createdAt?.split('T'));
        if (res.data.images[0])
          setImage1(res.data.images[0].image_url);
        if (res.data.images[1])
          setImage2(res.data.images[1].image_url);
        if (res.data.images[2])
          setImage3(res.data.images[2].image_url);
        if (res.data.images[3])
          setImage4(res.data.images[3].image_url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (deletedProduct === true) {
      axios
        .delete(
          `https://mystorify-api.cyclic.app/api/produits/${product.id}`
        )
        .then((res) => {
          console.log(res);
          navigate('/dashboard/admin/products');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [deletedProduct]);

  useEffect(() => {
    setCategorieId(product?.Sous_Categorie.id);
    setCategorieNom(product?.Sous_Categorie.nom);
    setDepotNom(product?.Depot.nom);
    setDepotId(product?.Depot.id);
  }, [product]);
  useEffect(() => {
    if (!image1 && !image2 && !image3 && !image4) {
      setErr(true);
    } else {
      setErr(false);
    }
  }, [image1, image2, image3, image4]);
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
    console.log(empty);
  };

  const handleReset = () => {
    setNom(product.nom);
    setDesc(product.description);
    setPrix(product.prix);
    setQuantity(product.quantity);
    if (product?.images[0]) setImage1(product.images[0].image_url);
    if (product?.images[1]) setImage2(product.images[1].image_url);
    if (product?.images[2]) setImage3(product.images[2].image_url);
    if (product?.images[3]) setImage4(product.images[3].image_url);

    setDepotNom(product.Depot.nom);
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

  const handleImage1Upload = (e) => {
    const file = e.target.files[0];
    TransformImage1(file);
  };
  const TransformImage1 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage1(reader.result);
      };
    } else {
      setImage1('');
    }
  };
  const handleImage2Upload = (e) => {
    const file = e.target.files[0];
    TransformImage2(file);
  };
  const TransformImage2 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage2(reader.result);
      };
    } else {
      setImage2('');
    }
  };
  const handleImage3Upload = (e) => {
    const file = e.target.files[0];
    TransformImage3(file);
  };
  const TransformImage3 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage3(reader.result);
      };
    } else {
      setImage3('');
    }
  };
  const handleImage4Upload = (e) => {
    const file = e.target.files[0];
    TransformImage4(file);
  };
  const TransformImage4 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage4(reader.result);
      };
    } else {
      setImage4('');
    }
  };
  const handleSubmit = () => {
    setIsLoading(true);
    const produit = {
      nom,
      description: desc,
      prix,
      quantity,
      depotId,
      categorieId,
      image1,
      image2,
      image3,
      image4,
    };

    axios
      .post(
        `https://mystorify-api.cyclic.app/api/produits/update/${productId}`,
        produit
      )
      .then((res) => {
        console.log(res);
        navigate(`/dashboard/admin/products`);
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
        <h2>Voir et modifier le details de ce produit</h2>
        <div
          className="form-flex"
          style={{
            justifyContent: 'space-between',
          }}
        >
          <p>
            Ce produit a été ajouté le {date[0]} à{' '}
            {date[1]?.substring(0, 8)}
          </p>
          <p>
            {product?.Review && (
              <div
                className="stars-wrapper"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {[...Array(Math.floor(calcAvg()))].map((x, i) => (
                  <TiStarFullOutline className="star" />
                ))}
                {[...Array(5 - Math.floor(calcAvg()))].map((x, i) => (
                  <TiStarFullOutline className="star unfilled" />
                ))}
                <small className="product-card__rating-count">
                  ({product.Review.length})
                </small>
              </div>
            )}
          </p>
        </div>
      </div>
      <div className="edit-profile">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-flex">
            <div>
              <label>Nom du produit </label>
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
              <label>Prix </label>
              <input
                id="prix"
                value={prix}
                onChange={(e) => {
                  setPrix(e.target.value);
                  handleErr(e);
                }}
              />
            </div>
            <div>
              <label>Quantité </label>
              <input
                id="quantity"
                value={quantity}
                type="text"
                onChange={(e) => {
                  setQuantity(e.target.value);
                  handleErr(e);
                }}
              />
            </div>
          </div>
          <div className="form-flex">
            <div style={{ color: '#3B4C68' }}>
              <p style={{ marginBottom: '1em' }}>
                La magasin de ce produit :{' '}
                <span style={{ fontWeight: '500' }}>
                  {product?.magasin?.nom}
                </span>
              </p>
              <p style={{ marginBottom: '1em' }}>
                Le dépot de ce produit :{' '}
                <span style={{ fontWeight: '500' }}>{depotNom}</span>
              </p>
              <p>
                La catégorie de ce produit :{' '}
                <span style={{ fontWeight: '500' }}>
                  {categorieNom}
                </span>
              </p>
            </div>
            <div></div>
          </div>

          <div
            className="add-product-images"
            style={{ marginBottom: '1.5em' }}
          >
            <label>Images </label>
            {err && (
              <p className="err" style={{ marginTop: '.5em' }}>
                Insérer au minimum une photo !
              </p>
            )}
            <div
              className="add-product-images-container"
              style={{ marginTop: '1em' }}
            >
              {image1 && (
                <div className="add-product-image">
                  <div className="add-product-image-preview">
                    <img src={image1} alt="Product Image" />
                    <button
                      className="add-product-image-delete"
                      onClick={() => {
                        setImage1('');
                      }}
                    >
                      <RxCross1 className="icon" size={17} />
                    </button>
                  </div>
                </div>
              )}
              {image2 && (
                <div className="add-product-image">
                  <div className="add-product-image-preview">
                    <img src={image2} alt="Product Image" />
                    <button
                      className="add-product-image-delete"
                      onClick={() => {
                        setImage2('');
                      }}
                    >
                      <RxCross1 className="icon" size={17} />
                    </button>
                  </div>
                </div>
              )}
              {image3 && (
                <div className="add-product-image">
                  <div className="add-product-image-preview">
                    <img src={image3} alt="Product Image" />
                    <button
                      className="add-product-image-delete"
                      onClick={() => {
                        setImage3('');
                      }}
                    >
                      <RxCross1 className="icon" size={17} />
                    </button>
                  </div>
                </div>
              )}
              {image4 && (
                <div className="add-product-image">
                  <div className="add-product-image-preview">
                    <img src={image4} alt="Product Image" />
                    <button
                      className="add-product-image-delete"
                      onClick={() => {
                        setImage4('');
                      }}
                    >
                      <RxCross1 className="icon" size={17} />
                    </button>
                  </div>
                </div>
              )}
              {!image1 && (
                <div className="add-product-image">
                  <div
                    className="add-product-image-overlay"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <span className="add-product-image-overlay-icon">
                      +
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleImage1Upload}
                  />
                </div>
              )}
              {image1 && !image2 && (
                <div className="add-product-image">
                  <div
                    className="add-product-image-overlay"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <span className="add-product-image-overlay-icon">
                      +
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleImage2Upload}
                  />
                </div>
              )}
              {image2 && !image3 && (
                <div className="add-product-image">
                  <div
                    className="add-product-image-overlay"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <span className="add-product-image-overlay-icon">
                      +
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleImage3Upload}
                  />
                </div>
              )}
              {image3 && !image4 && (
                <div className="add-product-image">
                  <div
                    className="add-product-image-overlay"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <span className="add-product-image-overlay-icon">
                      +
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleImage4Upload}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className="btns"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
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
                setDialogProduct(true);
              }}
            >
              <BsTrash />
              Supprimer
            </button>
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
        </form>
        {dialogProduct && (
          <Dialog
            text1="Est ce que vous-avez sur ?"
            setDialogProduct={setDialogProduct}
            setDeletedProduct={setDeletedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditProduct;
