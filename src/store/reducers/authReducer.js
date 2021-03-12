const initialState = {
    token: null,
    isAuthenticated: false,
    email: null,
    signup_msg: "",
    login_msg: "",
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated, 
        token:action.payload.token, 
        email: action.payload.adminId, 
        login_msg:action.payload.msg
      }
    case 'SIGNUP':
      return {
          ...state,
          signup_msg:action.payload
        };
    case 'LOGOUT':
      return{
        token: null,
        isAuthenticated: false,
        email: null,
        signup_msg: "",
        login_msg: "",
      }
    default:
      return state;
  }
};