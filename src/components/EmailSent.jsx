import { TfiEmail } from 'react-icons/tfi';
import { Link } from 'react-router-dom';

const EmailSent = ({ login }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div>
        <TfiEmail color='#4CAF50' size={50} />
      </div>
      <h3 style={{ color: 'black' }}>
        {' '}
        Un email a éte envoyer a votre email address pour confirmer !
      </h3>
      {login && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingInline: '1em',
          }}
        >
          <Link className=' btn-secondary' to='/login'>
            Login
          </Link>
          <Link className=' btn-secondary' to='/inscrire'>
            Insceivez-vous
          </Link>
        </div>
      )}
    </div>
  );
};
export default EmailSent;
