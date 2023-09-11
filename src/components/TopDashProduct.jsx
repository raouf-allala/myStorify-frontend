import Logo from '../assets/Rectangle 16.png';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
const TopDashProduct = ({ product }) => {
  const { magasin } = useOutletContext();
  return (
    <>
      <div className="dash-product">
        <div className="info">
          <img src={product?.images[0]?.image_url} alt="" />
          <div
            className="text"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <h3>
              {' '}
              {product?.nom.length > 10
                ? product?.nom.slice(0, 9) + '...'
                : product?.nom}{' '}
            </h3>
          </div>
        </div>
        <div className="list">
          <ul className="cols head">
            <li>Prix</li>
            <li>Commandes</li>
            <li>Totale</li>
          </ul>
          <ul className="cols nums">
            <li>{product?.prix}</li>
            <li>{product?._count?.Commande_Produit}</li>
            <li>
              {product?.prix * product?._count?.Commande_Produit}
            </li>
          </ul>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to={`/dashboard/magasin/${magasin.id}/products/${product?.id}`}
          >
            <BsThreeDots className="more" />
          </Link>
        </div>
      </div>
    </>
  );
};
export default TopDashProduct;
