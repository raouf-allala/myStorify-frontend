import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 40,
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
  },
  table: {
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    padding: 10,
  },
  tableHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#777',
    textTransform: 'uppercase',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
  tableFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingVertical: 10,
  },
  totalLabel: {
    flex: 3,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

const invoiceData = {
  title: 'Facture Du Commande',
  products: [
    { id: 1, name: 'Product A', quantity: 2, price: 10 },
    { id: 2, name: 'Product B', quantity: 3, price: 15 },
    { id: 3, name: 'Product C', quantity: 1, price: 20 },
  ],
  total: 75,
};

const Invoice = ({ commande }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{invoiceData.title}</Text>

      <Text style={styles.subtitle}>
        Invoice Number: FAC-00{commande.id}
      </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Product</Text>
          <Text style={styles.tableHeader}>Quantity</Text>
          <Text style={styles.tableHeader}>Price</Text>
          <Text style={styles.tableHeader}>Total</Text>
        </View>

        {/* {invoiceData.products.map((product) => (
          <View style={styles.tableRow} key={product.id}>
            <Text style={styles.tableCell}>{product.name}</Text>
            <Text style={styles.tableCell}>{product.quantity}</Text>
            <Text style={styles.tableCell}>{product.price}</Text>
            <Text style={styles.tableCell}>
              {product.quantity * product.price}
            </Text>
          </View>
        ))} */}
        {commande.commande_produits.map((commandeP) => (
          <View style={styles.tableRow} key={commandeP.id}>
            <Text style={styles.tableCell}>
              {commandeP.produit.nom}
            </Text>
            <Text style={styles.tableCell}>{commandeP.quantity}</Text>
            <Text style={styles.tableCell}>
              {commandeP.produit.prix} DA
            </Text>
            <Text style={styles.tableCell}>
              {commandeP.quantity * commandeP.produit.prix} DA
            </Text>
          </View>
        ))}
        <View style={styles.tableFooter}>
          <Text style={styles.totalLabel}>Total</Text>
          <View style={styles.totalValue}>
            <Text>{commande.totale} DA</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default Invoice;
