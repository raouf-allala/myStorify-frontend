import { Route, Routes } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import Header from './components/Header';
import Products from './pages/user/Products';
import Login from './pages/user/Login';
import ProductDetails from './pages/user/ProductDetails';
import Checkout from './pages/user/Checkout';
import ChargeCredit from './pages/user/ChargeCredit';
import DemanderMagasin from './pages/user/DemanderMagasin';
import GoogleLogin from './components/GoogleLogin';
import VerifyEmail from './components/VerifyEmail';
import RegisterPage from './pages/user/RegisterPage';
import Home from './pages/user/Home';
import Cart from './pages/user/Cart';
import Wishlist from './pages/user/Wishlist';
import ManageProfile from './pages/user/ManageProfile';
import EditProfile from './pages/user/EditProfile';
import SecurityProfile from './pages/user/SecurityProfile';
import ForgotPass from './pages/user/ForgotPass';
import UpdateForgotPass from './pages/user/UpdateForgotPass';
import Footer from './components/Footer';
import EditEmail from './pages/user/EditEmail';
import VerifyEditEmail from './components/VerifyEditEmail';
import Contact from './pages/user/Contact';
import Report from './pages/user/Report';
import Magasins from './pages/user/Magasins';
import DashMagasinSides from './components/DashMagasinSides';
import DashView from './pages/store-owner/DashView';
import MagasinProducts from './pages/user/MagasinProducts';
import AddProduct from './pages/store-owner/AddProduct';
import DashProducts from './pages/store-owner/DashProducts';
import EditProduct from './pages/store-owner/EditProduct';
import EditMagasin from './pages/store-owner/EditMagasin';
import DashAdminSides from './components/DashAdminSides';
import UsersList from './pages/admin/UsersList';
import UpdateUser from './pages/admin/UpdateUser';
import AddUser from './pages/admin/AddUser';
import AdminProducts from './pages/admin/AdminProducts';
import AdminEditProduct from './pages/admin/AdminEditPorduct';
import AdminMagasinList from './pages/admin/AdminMagasinList';
import AdminEditMagasin from './pages/admin/AdminEditMagasin';
import ReportsList from './pages/admin/ReportsList';
import DashReport from './components/DashReport';
import ReportDetails from './pages/admin/ReportDetails';
import DemandeMagasin from './pages/user/DemandeMagasin';
import CompleteInfo from './pages/user/CompleteInfo';
import UpdateAdmin from './pages/admin/UpdateAdmin';
import UpdateAdminPass from './pages/admin/UpdateAdminPass';
import CodesPromos from './pages/admin/CodesPromos';
import ListeCategories from './pages/admin/ListeCategories';
import AddCategorie from './pages/admin/AddCategorie';

import ListeCommandes from './pages/store-owner/ListeCommandes';
import CommandeDetails from './pages/store-owner/CommandeDetails';
import CIB from './pages/user/CIB';
import History from './pages/user/History';
import AllProducts from './pages/user/AllProducts';
import Search from './pages/user/Search';
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
