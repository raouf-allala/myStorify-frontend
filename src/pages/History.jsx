import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CommandeItem from '../components/CommandeItem';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../components/Invoice';
import { FiDownload } from 'react-icons/fi';
const History = () => {
  const [commandes, setCommandes] = useState([]);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    axios
      .get(
        `https://mystorify-api.cyclic.app/api/achat/user/${user.id}`
      )
      .then((res) => {
        console.log(res.data);
        setCommandes(res.data);
      });
  }, []);
  return (
    <main>
      <div className="container">
        <section>
          <div style={{ border: 'none' }} className="section-wrapper">
            <h1
              style={{
                fontWeight: 400,
                fontSize: '1.5rem',
                marginBottom: '1.2em',
              }}
            >
              Mes Commandes : ({commandes.length})
            </h1>
            {commandes.length !== 0 && (
              <div>
                {commandes.map((commande, i) => {
                  return (
                    <div
                      style={{
                        border: '1px solid rgba(0, 0, 0, 0.185)',
                        marginBottom: '1.5em',
                        padding: '1.4em',
                        borderRadius: '10px',
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 400,
                          fontSize: '1.4rem',
                          marginBottom: '1.3em',
                          fontWeight: 'bold',
                        }}
                      >
                        Commande Num : {i + 1}
                      </p>
                      {commande.commande_produits.map((commandeP) => {
                        return (
                          <CommandeItem
                            product={commandeP.produit}
                            quantity={commandeP.quantity}
                          />
                        );
                      })}
                      <div
                        style={{
                          display: 'flex',
                          marginBottom: '1em',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <p
                          style={{
                            marginRight: '1em',
                            fontSize: '1.1rem',
                          }}
                        >
                          Totale Du Commande :{' '}
                          <span
                            style={{
                              color: '#2E47BD',
                              fontWeight: '500',
                            }}
                          >
                            {commande.totale} DA
                          </span>
                        </p>
                        <PDFDownloadLink
                          document={<Invoice commande={commande} />}
                          fileName="Facture"
                        >
                          <button
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1em',
                            }}
                            className="btn"
                          >
                            <p> Telecharger Facture</p>
                            <FiDownload />
                          </button>
                        </PDFDownloadLink>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {commandes.length === 0 && (
              <div className="center">
                <h2
                  style={{
                    fontWeight: '400',
                    fontSize: '1.3rem',
                    marginBottom: '1.5em',
                  }}
                >
                  Vous N'avez Aucun Commandes !
                </h2>
                <Link className="btn" to="/">
                  Voir Les Produits
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default History;
