import { FaUserCircle } from 'react-icons/fa';
import { TiStarFullOutline } from 'react-icons/ti';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '.7em',
        }}
      >
        <FaUserCircle className="user-icon" />
        <p className="username">
          {review.utilisateur.nom + ' ' + review.utilisateur.prenom}
        </p>
      </div>
      <div className="stars-wrapper">
        {[...Array(review.evaluation)].map((x, i) => (
          <TiStarFullOutline key={i} className="star" />
        ))}
        {[...Array(5 - review.evaluation)].map((x, i) => (
          <TiStarFullOutline key={i} className="star unfilled" />
        ))}
      </div>
      <div>
        <p className="review-title">{review.title}</p>
        <p className="review-description">{review.description}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
