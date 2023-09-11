const CommandeItem = ({ product, quantity }) => {
  return (
    <li className="cart-table-row2">
      <div
        style={{
          display: 'flex',
          gap: '1em',
          alignItems: 'center',
        }}
      >
        <div className="cart-item-img">
          <img src={product.images[0].image_url} alt="" />
        </div>

        <p>
          {product.nom.length > 60
            ? product.nom.slice(0, 40) + '...'
            : product.nom}
        </p>
      </div>
      <p>Prix : {product.prix} DA</p>
      <p>Quantité : {quantity}</p>
      <p>Total : {product.prix * quantity} DA</p>
      <button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'red',
          width: 'max-content',
          borderBottom: '1px solid red',
          cursor: 'pointer',
          marginLeft: '4em',
        }}
      >
        Retourner
      </button>
    </li>
  );
};
export default CommandeItem;
