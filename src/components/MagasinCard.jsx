import { Link } from 'react-router-dom';

const MagasinCard = ({ magasin }) => {
  return (
    <div className="product-card">
      <div className="product-card-top">
        <div className="product-card__cta">
          <Link to={`/magasin/${magasin?.id}`}>Voir Produits</Link>
        </div>
        <img
          className="product-card__img"
          src={magasin?.logo}
          alt=""
        />
      </div>
      <div className="product-card__content">
        <p className="product-card__title">
          {magasin?.nom.length > 25
            ? magasin?.nom.slice(0, 24) + '...'
            : magasin?.nom}
        </p>
        <p>
          Plus De{' '}
          <span className="product-card__price">
            {magasin?._count.produits} Produits
          </span>
        </p>
      </div>
    </div>
  );
};

export default MagasinCard;
