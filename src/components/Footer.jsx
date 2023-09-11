import { Link, Outlet } from 'react-router-dom';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
const Footer = () => {
  return (
    <>
      <Outlet />
      <div className='footer-wrapper'>
        <div className='container'>
          <footer>
            <div className='support'>
              <h3 style={{ color: 'white' }}> Support</h3>
              <ul>
                <li>Nouvel ville, Tri9 jdida</li>
                <li>Skandarcron@gmail.com</li>
                <li>05 59 52 33 21</li>
              </ul>
            </div>
            <div className='compte'>
              <h3 style={{ color: 'white' }}>Compte</h3>
              <ul>
                <li>Mon Compte</li>
                <li>Login / S'inscrire</li>
                <li>Cart</li>
                <li>Liste des favoris</li>
              </ul>
            </div>
            <div className='quick-link'>
              <h3 style={{ color: 'white' }}>Lien rapide</h3>
              <ul>
                <li>
                  <Link>Politique de confidentialité</Link>
                </li>
                <li>
                  <Link>Conditions d'utilisation</Link>
                </li>
                <li>
                  <Link>FAQ</Link>
                </li>
                <li>
                  <Link>Contact</Link>
                </li>
              </ul>
            </div>
            <div className='app'></div>
          </footer>
        </div>
        <p className='copyright'>
          <AiOutlineCopyrightCircle />
          Copyright L3 2023. Tous droits réservés
        </p>
      </div>
    </>
  );
};
export default Footer;
