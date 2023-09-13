const ProductCardSkeleton = () => {
  return (
    <div className="product-card">
      <div className="skeleton product-card-top animate-pulse"></div>
      <div className="skeleton skeleton-title animate-pulse"></div>
      <div className="skeleton skeleton-text animate-pulse"></div>
    </div>
  );
};

export default ProductCardSkeleton;
