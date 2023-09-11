import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
const Dialog = ({
  text1,
  text2,
  setDialogDepot,
  setDialogMagasin,
  setDeletedMagasin,
  singleBtn,
  setDeletedDepot,
  setDeletedProduct,
  setDialogProduct,
  setDeletedUser,
  setDialogUser,
  setDialogCode,
  setDeletedCode,
  setDialogCate,
}) => {
  return (
    <div className='dialog-wrapper'>
      <div className='dialog'>
        <p>{text1}</p>
        <p>{text2 && text2}</p>
        {!singleBtn ? (
          <div>
            <button
              className='btn btn-sec'
              onClick={() => {
                if (setDialogMagasin) {
                  setDialogMagasin(false);
                } else if (setDialogProduct) {
                  setDialogProduct(false);
                } else if (setDialogUser) {
                  setDialogUser(false);
                } else if (setDialogCode) {
                  setDeletedCode(false);
                } else if (setDialogDepot) {
                  setDialogDepot(false);
                }
              }}
            >
              Cancele
            </button>
            <button
              className='btn'
              style={{
                backgroundColor: 'red',
                display: 'flex',
                alignItems: 'center',
                gap: '.5em',
              }}
              onClick={() => {
                if (setDialogMagasin) {
                  setDeletedMagasin(true);
                } else if (setDialogProduct) {
                  setDeletedProduct(true);
                } else if (setDialogUser) {
                  setDeletedUser(true);
                } else if (setDialogCode) {
                  setDeletedCode(true);
                  setDialogCode(false);
                } else if (setDialogDepot) {
                  setDeletedDepot(true);
                  setDialogDepot(false);
                }
              }}
            >
              Oui
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button
              className='btn'
              style={{
                backgroundColor: 'red',
              }}
              onClick={() => {
                if (close) setDialogCate(false);
              }}
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dialog;
