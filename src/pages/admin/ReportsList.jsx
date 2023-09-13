import { useOutletContext, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import DashMagasin from '../../components/DashMagasin';
import DashReport from '../../components/DashReport';

const ReportsList = () => {
  const [dropdownCata, setDropdownCata] = useState(false);
  const [dropdownDate, setDropdownDate] = useState(false);

  const [counter, setCounter] = useState();
  const [page, setPage] = useState();
  const [nom, setNom] = useState();
  const [total, setTotal] = useState();
  const [sort, setSort] = useState('Le plus récent');
  const [reports, setReports] = useState([]);
  const [type, setType] = useState(null);
  const [typeNom, setTypeNom] = useState('Toutes');
  const [dateOrder, setDateOrder] = useState('desc');
  const [err, setErr] = useState();

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_SERVER_HOST}/api/users/reports`, {
        dateOrder,
        nom,
        type,
      })
      .then((res) => {
        console.log(res.data);
        setReports(res.data.reports);
        setTotal(res.data.total);
        setCounter(res.data.reports.length);
        setPage(1);

        console.log(res.data.total);
        setErr('');
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  }, [dateOrder, , nom, type]);
  const getNext = (take, skip, last) => {
    axios
      .post(`${import.meta.env.VITE_SERVER_HOST}/api/reports/paged`, {
        take,
        skip,
        dateOrder,
        nom,
        type,
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        if (!last) setCounter((current) => current + res.data.length);
        setErr('');
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  };
  const getPrev = (take, skip, last) => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER_HOST}/api/reports/paged/`,
        {
          take,
          skip,
          dateOrder,
          nom,
          type,
        }
      )
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setCounter((current) => current - reports.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="dash-content dash-products">
        <div className="head">
          <h2>List des reclamations</h2>
        </div>
        <div
          className="form-flex"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1em',
          }}
        >
          <div></div>
          <div>
            <label style={{}}>Trier par </label>
            <div className="dropdown" style={{ zIndex: '5' }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownDate((current) => !current);
                }}
                className={dropdownDate ? 'dropdown-open' : undefined}
              >
                {sort}
                <IoIosArrowDown
                  className={
                    !dropdownDate
                      ? 'arrow-down'
                      : 'arrow-down arrow-down-rotated'
                  }
                />
              </button>
              <AnimatePresence>
                {dropdownDate && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="dropdown-methods"
                  >
                    <li
                      onClick={() => {
                        setDateOrder('desc');
                        setSort('Le plus récent');
                        setDropdownDate(false);
                      }}
                    >
                      Le plus récent
                    </li>
                    <li
                      onClick={() => {
                        setDateOrder('asc');
                        setSort('Le plus ancient');
                        setDropdownDate(false);
                      }}
                    >
                      Le plus ancient
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <label style={{}}>Type </label>
            <div
              className="dropdown"
              style={{ zIndex: '5', marginBlock: '0' }}
            >
              <button
                style={{ marginBlock: '0' }}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownCata((current) => !current);
                }}
                className={dropdownCata ? 'dropdown-open' : undefined}
              >
                {typeNom}
                <IoIosArrowDown
                  className={
                    !dropdownCata
                      ? 'arrow-down'
                      : 'arrow-down arrow-down-rotated'
                  }
                />
              </button>
              <AnimatePresence>
                {dropdownCata && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="dropdown-methods"
                  >
                    <li
                      onClick={() => {
                        setType('bug');
                        setTypeNom('Bug');
                        setDropdownCata(false);
                      }}
                    >
                      Bug
                    </li>
                    <li
                      onClick={() => {
                        setType('personnel');
                        setTypeNom('Personnele');
                        setDropdownCata(false);
                      }}
                    >
                      Personnele
                    </li>
                    <li
                      onClick={() => {
                        setTypeNom('Toutes');
                        setType(null);
                        setDropdownCata(false);
                      }}
                    >
                      Toutes
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="search-input-holder">
            <FiSearch className="search-icon" color="#3B4C68" />
            <input
              type="text"
              className="search-input"
              onChange={(e) => {
                setNom(e.target.value);
              }}
            />
          </div>
        </div>

        <div
          className="list"
          style={{
            paddingRight: '2em',
            marginTop: '3em',
            borderBottom: 'solid 1px #B7C1D1',
            paddingBottom: '.7em',
          }}
        >
          <ul className=" head magasins">
            <li>Titre</li>
            <li>Reporter</li>
            <li>Type</li>
          </ul>
        </div>
        {!err && (
          <div className="dash-products-wrapper">
            {reports &&
              reports.map((report) => {
                return (
                  <DashReport
                    report={report}
                    link={`/dashboard/admin/reports/${report.id}`}
                  />
                );
              })}
          </div>
        )}
        {!err && (
          <div className="pages">
            <p className="number">
              {counter} de {total} reclamations
            </p>

            <div>
              {total > 10 && (
                <>
                  {counter > 11 && (
                    <>
                      <AiOutlineLeft
                        className="arrow"
                        onClick={() => {
                          getPrev(
                            10,
                            counter - reports.length - 10,
                            false
                          );
                          setPage((current) => --current);
                        }}
                      />
                    </>
                  )}
                  {page <= Math.ceil(total / 10) && (
                    <span
                      className="number"
                      style={
                        page === 1
                          ? { color: '#2E47BD' }
                          : { color: '#3B4C68' }
                      }
                      onClick={() => {
                        getNext(10, 0, false);
                        setCounter(0);
                        setPage(1);
                      }}
                    >
                      1
                    </span>
                  )}
                  {page > 1 && (
                    <span
                      className="number"
                      style={{ color: '#2E47BD' }}
                    >
                      ... {page}
                    </span>
                  )}
                  {page < Math.ceil(total / 10) && (
                    <span
                      className="number"
                      onClick={() => {
                        console.log(total);
                        if (total % 10 === 0)
                          getNext(10, total - 10, true);
                        else getNext(10, total - (total % 10), true);
                        setCounter(total);
                        setPage(Math.ceil(total / 10));
                      }}
                    >
                      ... {Math.ceil(total / 10)}
                    </span>
                  )}
                  {counter < total && (
                    <AiOutlineRight
                      className="arrow"
                      onClick={() => {
                        getNext(10, counter, false);
                        setPage((current) => ++current);
                        console.log(counter);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {err && (
          <h3
            style={{
              textAlign: 'center',
              color: '#3B4C68',
              marginTop: '3em',
            }}
          >
            {err}
          </h3>
        )}
      </div>
    </>
  );
};
export default ReportsList;
