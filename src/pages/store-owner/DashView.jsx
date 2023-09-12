import { FiArrowUpRight } from 'react-icons/fi';
import TopDashProduct from '../../components/TopDashProduct';
import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import { current } from '@reduxjs/toolkit';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
const DashView = () => {
  const { magasin } = useOutletContext();
  const [products, setProducts] = useState();
  const [total, setTotal] = useState(0);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  // Get the current date
  var currentDate = new Date();

  // Get the month of the current date (0-11)
  var currentMonth = currentDate.getMonth();

  // Create an array to store the last 7 months
  var last7Months = [];

  // Create an array of month names
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Loop through the last 7 months and add their names to the array
  for (var i = 0; i < 7; i++) {
    // Calculate the index of the previous month
    var previousMonthIndex = (currentMonth - i + 12) % 12;

    // Get the name of the previous month
    var previousMonthName = monthNames[previousMonthIndex];

    // Add the previous month name to the array
    last7Months.push(previousMonthName);
  }
  last7Months.reverse();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  // const labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  // ];

  const data = {
    labels: last7Months,
    datasets: [
      {
        label: 'Dinnars',
        data: last7Months.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        backgroundColor: 'rgba(0, 121, 255, 0.4)',
      },
    ],
  };
  useEffect(() => {
    axios
      .get(
        `https://mystorify-api.cyclic.app/api/produits/dashTop/${magasin.id}`
      )
      .then((res) => {
        console.log(res.data);
        setTotal(0);
        setProducts(res.data);
        res.data.forEach((product) => {
          setTotal(
            (current) =>
              current + product._count.Commande_Produit * product.prix
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="dash-content">
        <div className="dash-view">
          <div className="head">
            <h2>Statistique</h2>
            <p>Bienvenue !!</p>
          </div>
          <div className="stat">
            <div className="left">
              <h3>Revenu mensuel moyen</h3>
              <div style={{ width: '80%' }}>
                <Bar options={options} data={data} />
              </div>
            </div>
            <div className="right">
              <div className="text">
                <h3>Les revenus</h3>
                <div>
                  <div className="icon-wrapper">
                    <FiArrowUpRight className="icon" />
                  </div>
                  <small>Aujourd'hui</small>
                </div>
              </div>
              <div className="num">
                <p>74%</p>
              </div>
              <p className="total">Total : {total} DA</p>
            </div>
          </div>
          <div className="highlight">
            <div className="text">
              <h2>Les produits forts</h2>
            </div>
          </div>
          {products && (
            <>
              <TopDashProduct product={products[0]} />
              <TopDashProduct product={products[1]} />
              <TopDashProduct product={products[2]} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default DashView;
