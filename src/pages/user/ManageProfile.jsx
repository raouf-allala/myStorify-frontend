import { useSelector } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router-dom';

const ManageProfile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <main>
        <div className='container'>
          <div className='edit-profile'>
            <p className='welcome'>
              Bienvenue! <span>{user.nom}</span>
            </p>
            <div className='edit-flex'>
              <div className='left'>
                <h3>Gérer Mon Profile</h3>
                <ul>
                  <li>
                    <Link to='/compte/info'>Mon Profile</Link>
                  </li>
                  <li>
                    <Link to='/compte/securité'>Sécurité</Link>
                  </li>
                  <li>
                    <Link to='/compte/email'>Email</Link>
                  </li>
                </ul>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default ManageProfile;
