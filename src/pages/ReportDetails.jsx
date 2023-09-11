import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authUpdate } from '../features/auth/authSlice';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import Dialog from '../components/Dialog';

const ReportDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState();
  const [date, setDate] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/reports/${id}`)
      .then((res) => {
        console.log(res.data);
        setReport(res.data);
        setDate(res.data.createdAt.split('T'));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className='dash-content'>
      <div className='head'>
        <h2>Voir les details de cette reclamation</h2>
        <p style={{ fontWeight: 'lighter' }}>
          Cette reclamation a été envoyer le {date && date[0] + ' '} à{' '}
          {date && date[1].substring(0, 8)} par l'utilisateur
          <span style={{ fontWeight: '500' }}>
            {' ' + report?.utilisateur?.nom + ' '} {report?.utilisateur?.prenom}
          </span>
        </p>
        <h3>Déscription : </h3>
        <p style={{ fontWeight: 'lighter' }}>{report?.description}</p>
      </div>
      <div
        className='btns'
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1em',
        }}
      >
        <button
          className='btn'
          onClick={() => {
            navigate('/dashboard/admin/reports');
          }}
        >
          Retourner
        </button>
      </div>
    </div>
  );
};

export default ReportDetails;
