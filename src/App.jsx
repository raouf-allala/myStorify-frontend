import { Route, Routes } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import Header from './components/Header';
import Products from './pages/Products';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import ChargeCredit from './pages/ChargeCredit';
import DemanderMagasin from './pages/DemanderMagasin';
import GoogleLogin from './components/GoogleLogin';
import VerifyEmail from './components/VerifyEmail';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ManageProfile from './pages/ManageProfile';
import EditProfile from './pages/EditProfile';
import SecurityProfile from './pages/SecurityProfile';
import ForgotPass from './pages/ForgotPass';
import UpdateForgotPass from './pages/UpdateForgotPass';
import Footer from './components/Footer';
import EditEmail from './pages/EditEmail';
import VerifyEditEmail from './components/VerifyEditEmail';
import Contact from './pages/Contact';
import Report from './pages/Report';
import Magasins from './pages/Magasins';
import DashMagasinSides from './components/DashMagasinSides';
import DashView from './pages/DashView';
import MagasinProducts from './pages/MagasinProducts';
import AddProduct from './pages/AddProduct';
import DashProducts from './pages/DashProducts';
import EditProduct from './pages/EditProduct';
import EditMagasin from './pages/EditMagasin';
import DashAdminSides from './components/DashAdminSides';
import UsersList from './pages/UsersList';
import UpdateUser from './pages/UpdateUser';
import AddUser from './pages/AddUser';
import AdminProducts from './pages/AdminProducts';
import AdminEditProduct from './pages/AdminEditPorduct';
import AdminMagasinList from './pages/AdminMagasinList';
import AdminEditMagasin from './pages/AdminEditMagasin';
import ReportsList from './pages/ReportsList';
import DashReport from './components/DashReport';
import ReportDetails from './pages/ReportDetails';
import DemandeMagasin from './pages/DemandeMagasin';
import CompleteInfo from './pages/CompleteInfo';
import UpdateAdmin from './pages/UpdateAdmin';
import UpdateAdminPass from './pages/UpdateAdminPass';
import CodesPromos from './pages/CodesPromos';
import ListeCategories from './pages/ListeCategories';
import AddCategorie from './pages/AddCategorie';

import ListeCommandes from './pages/ListeCommandes';
import CommandeDetails from './pages/CommandeDetails';
import CIB from './pages/CIB';
import History from './pages/History';
import AllProducts from './pages/AllProducts';
import Search from './pages/Search';
const socket = io.connect('http://localhost:3001', {
  withCredentials: true,
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/googleLogin" element={<GoogleLogin />} />

        <Route path="/" element={<Header socket={socket} />}>
          <Route path="/" element={<Footer />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/completeInfo" element={<CompleteInfo />} />
            <Route path="/forgotPass" element={<ForgotPass />} />
            <Route path="/historique" element={<History />} />
            <Route path="/recharcher/:search" element={<Search />} />
            <Route
              path="/forgotPass/update"
              element={<UpdateForgotPass />}
            />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route
              path="/verifyEditEmail"
              element={<VerifyEditEmail />}
            />
            <Route path="/panier" element={<Cart />} />
            <Route path="/favoris" element={<Wishlist />} />
            <Route path="/inscrire" element={<RegisterPage />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/produits/tous" element={<AllProducts />} />
            <Route
              path="/produits/:produitId"
              element={<ProductDetails />}
            />
            <Route path="/paiement" element={<Checkout />} />
            <Route path="/credit" element={<ChargeCredit />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/produits/catégorie/:category"
              element={<Products />}
            />
            <Route path="/report" element={<Report />} />
            <Route path="/magasins" element={<Magasins />} />
            <Route
              path="/magasin/:id"
              element={<MagasinProducts />}
            />
            <Route
              path="/demandeMagasin"
              element={<DemandeMagasin />}
            />
            <Route path="/compte" element={<ManageProfile />}>
              <Route path="info" element={<EditProfile />} />
              <Route path="securité" element={<SecurityProfile />} />
              <Route path="email" element={<EditEmail />} />
            </Route>
          </Route>
        </Route>
        <Route
          path="/dashboard/magasin/"
          element={<DashMagasinSides />}
        >
          <Route path=":magasinId" element={<DashView />} />
          <Route
            path=":magasinId/products"
            element={<DashProducts />}
          />
          <Route path=":magasinId/update" element={<EditMagasin />} />
          <Route
            path=":magasinId/products/:productId"
            element={<EditProduct />}
          />
          <Route
            path=":magasinId/products/add"
            element={<AddProduct />}
          />
          <Route
            path=":magasinId/commandes/:commandeId"
            element={<CommandeDetails />}
          />
          <Route
            path=":magasinId/products/add"
            element={<AddProduct />}
          />
          <Route
            path=":magasinId/commandes"
            element={<ListeCommandes />}
          />
        </Route>
        <Route path="/dashboard/admin/" element={<DashAdminSides />}>
          <Route path="users/add" element={<AddUser />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<UpdateUser />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="codesPromos" element={<CodesPromos />} />
          <Route
            path="products/:productId"
            element={<AdminEditProduct />}
          />
          <Route path="magasins/" element={<AdminMagasinList />} />
          <Route
            path="magasins/:magasinId"
            element={<AdminEditMagasin />}
          />
          <Route path="reports/" element={<ReportsList />} />
          <Route path="reports/:id" element={<ReportDetails />} />
          <Route path="categories" element={<ListeCategories />} />
          <Route path="categories/add" element={<AddCategorie />} />
          <Route path="update" element={<UpdateAdmin />} />
          <Route
            path="update/password"
            element={<UpdateAdminPass />}
          />
        </Route>
        <Route />
        <Route path="/paiement/CIB" element={<CIB />} />
      </Routes>
    </div>
  );
}

export default App;
