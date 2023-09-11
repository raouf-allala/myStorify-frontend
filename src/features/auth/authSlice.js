import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: localStorage.getItem('user') ? true : false,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  rememberMe: localStorage.getItem('rememberMe')
    ? JSON.parse(localStorage.getItem('rememberMe'))
    : false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem(
        'user',
        JSON.stringify(action.payload.user)
      );
      console.log(action.payload.rememberMe);
      if (action.payload.rememberMe) {
        localStorage.setItem(
          'rememberMe',
          JSON.stringify(action.payload.user.email)
        );
        state.rememberMe = action.payload.user.email;
      }
    },
    authUpdate: (state, action) => {
      const user = action.payload;
      state.user = user;
      console.log(action.payload);
      localStorage.setItem('user', JSON.stringify(user));
      const remember = localStorage.getItem('rememberMe');
      console.log(remember);
      if (!(remember === null || remember === false))
        localStorage.setItem(
          'rememberMe',
          JSON.stringify(user.email)
        );
    },

    authFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    authClear: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },
    errorReset: (state, action) => {
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.rememberMe = false;
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('user'); // Remove user data from local storage
      axios
        .post(
          'https://mystorify-api.cyclic.app/api/users/logout',
          null,
          {
            withCredentials: true,
          }
        )
        .catch((err) => console.log(err)); // Log any errors that occur during logout
    },
  },
});

export const login =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    dispatch(authRequest());
    try {
      const response = await axios.post(
        'https://mystorify-api.cyclic.app/api/users/login',
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      const user = response.data;
      const payload = {
        user: user,
        rememberMe: rememberMe,
      };
      dispatch(authSuccess(payload));
    } catch (error) {
      dispatch(authFailure(error.response.data.message));
    }
  };
export const verifyRemember = (rememberMe) => async (dispatch) => {
  console.log(rememberMe);
  if (rememberMe) {
    const email = rememberMe;
    console.log(email);
    try {
      const response = await axios.post(
        'https://mystorify-api.cyclic.app/api/users/getRememberedUser',
        { email },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      const user = response.data;
      const payload = {
        user: user,
        rememberMe: email,
      };
      dispatch(authSuccess(payload));
    } catch (err) {
      console.log(err);
    }
  }
};
export const googleLogin = (rememberMe) => async (dispatch) => {
  dispatch(authRequest());
  console.log(rememberMe);
  try {
    const response = await axios.get(
      'https://mystorify-api.cyclic.app/api/users/googleLogin',
      {
        withCredentials: true,
      }
    );

    console.log(response);
    const user = response.data.user;
    console.log(user);
    const payload = {
      user: user,
      rememberMe: rememberMe,
    };
    dispatch(authSuccess(payload));
  } catch (error) {
    dispatch(authFailure(error.response.data.message));
    console.log(error);
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch(authRequest());
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(authSuccess(user));
    } else {
      throw new Error('User data not found in local storage');
    }
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};
// export const rechargerCredit =
//   async (code, utilisateurId) => async (dispatch) => {
//     try {
//       console.log(utilisateurId);
//       console.log(code);
//       const response = await axios.post(
//         'https://mystorify-api.cyclic.app/api/users/credit',
//         { code, utilisateurId },
//         { withCredentials: true }
//       );
//       const user = response.data;
//       const payload = {
//         user: user,
//       };
//       dispatch(authUpdate(payload));
//     } catch (error) {
//       dispatch(authFailure(error.response.data.message));
//     }
//   };
export const rechargerCredit =
  ({ code, utilisateurId }) =>
  async (dispatch) => {
    try {
      const response = await axios.patch(
        'https://mystorify-api.cyclic.app/api/users/credit',
        { code, utilisateurId },
        { withCredentials: true }
      );
      const user = response.data;
      const payload = {
        user: user,
      };
      dispatch(authUpdate(payload.user));
    } catch (error) {
      dispatch(authFailure(error.response.data.message));
    }
  };
export const {
  authRequest,
  authSuccess,
  authFailure,
  logout,
  authUpdate,
  authClear,
  errorReset,
} = authSlice.actions;

export default authSlice.reducer;
