import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Successs = ({ message, message2 }) => {
  return (
    <div className='success'>
      <div className='success'>
        <div class='success-checkmark'>
          <div class='check-icon'>
            <span class='icon-line line-tip'></span>
            <span class='icon-line line-long'></span>
            <div class='icon-circle'></div>
            <div class='icon-fix'></div>
          </div>
        </div>
        <h3 style={{ color: 'black' }}>{message}</h3>
        <h3 style={{ color: 'black' }}>{message2 && message2}</h3>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Link className='btn-secondary' to='/'>
            Retouner a la page d'acceuil
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Successs;
