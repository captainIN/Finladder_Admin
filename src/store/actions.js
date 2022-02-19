import axios from 'axios'

// const API_URL = "http://localhost:4000";
const API_URL = "https://finladder.co/api/admin"

export const SIGNUP= 'SIGNUP';
export const createAdmin = (name, email, mobile, password, history) => async (dispatch, getState) => {
    console.log("reached", getState)
    try{
        const res = await axios.post(`${API_URL}/signup`,{
            "name": name,
            "email": email,
            "mobile": mobile,
            "password": password 
        });
        console.log(res)
        dispatch({
            type: SIGNUP,
            payload: res.data.msg
        });
        history.push('/login')
    }catch(err){
        dispatch({
            type: SIGNUP,
            payload: "User Already Exists"
        });
        throw err;
    }
};

export const LOGIN = 'LOGIN';
export const checkAdmin = (email, password, history) => async (dispatch, getState) => {
  try{
    const res = await axios.post(`${API_URL}/signin`,{
        "email": email,
        "password": password 
      });
    console.log(res.data)
    if(res.data.token){
      dispatch({
        type: LOGIN,
        payload: {isAuthenticated:true, token:res.data.token, adminId: res.data.email, msg:""}
      });
      history.push('/')
      
    }else{
      dispatch({
        type: LOGIN,
        payload: {isAuthenticated:false, token:null, adminId: null, msg:"Something went wrong!"}
      });
    }
}catch(err){
    dispatch({
      type: LOGIN,
      payload: {isAuthenticated:false, token:null, adminId: null, msg:"Something went wrong!"}
    });
    throw err;
} 
    
};

export const LOGOUT = 'LOGOUT';
export const logout = () => async (dispatch, getState) => {
  dispatch({
    type: LOGOUT,
    payload: {}
  });
}

export const CREATE_COURSE = 'CREATE_COURSE';
export const createCourse = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/add-new-course`,data,{
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${getState().auth.token}`
    }
  });

  return res
}

export const EDIT_COURSE = 'EDIT_COURSE';
export const editCourse = (id,data) => async (dispatch, getState) => {
  const res = await axios.put(`${API_URL}/update-course/${id}`,data,{
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${getState().auth.token}`
    }
  });

  return res
}

export const FETCH_COURSE = 'FETCH_COURSE';
export const fetchCourse = () => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/course`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  dispatch({
    type: FETCH_COURSE,
    payload: res.data
  });
}

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const fetchCategory = () => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/getAllCategories`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  dispatch({
    type: FETCH_CATEGORY,
    payload: res.data
  });
}

export const FETCH_FRMS = 'FETCH_FRMS';
export const fetchfrms = () => async (dispatch, getState) => {
  console.log('reunn')
  const res = await axios.get(`${API_URL}/frms`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  dispatch({
    type: FETCH_FRMS,
    payload: res.data
  });
}

export const FETCH_CFMS = 'FETCH_CFMS';
export const fetchcfms = () => async (dispatch, getState) => {
  console.log('reunn')
  const res = await axios.get(`${API_URL}/cfms`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  dispatch({
    type: FETCH_CFMS,
    payload: res.data
  });
}
export const FETCH_CFAS = 'FETCH_CFAS';
export const fetchcfas = () => async (dispatch, getState) => {
 
  const res = await axios.get(`${API_URL}/cfas`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  dispatch({
    type: FETCH_CFAS,
    payload: res.data
  });
}
export const FETCH_EQRS = 'FETCH_EQRS';
export const fetcheqrs = () => async (dispatch, getState) => {
 
  const res = await axios.get(`${API_URL}/eqrs`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  dispatch({
    type: FETCH_EQRS,
    payload: res.data
  });
}
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const createCategory = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/postCategory`,data, {
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}
export const POST_CATEGORY = 'POST_CATEGORY';
export const updateCategory = (data) => async (dispatch, getState) => {
  const res = await axios.put(`${API_URL}/updateCategory`,data, {
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const deleteCategory = (id) => async (dispatch, getState) => {
  const res = await axios.delete(`${API_URL}/deleteCategory/${id}`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}
export const FETCH_HOME_PAGE_BANNER = 'FETCH_HOME_PAGE_BANNER';
export const fetchHomePageBanner = () => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/allBanners`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  dispatch({
    type: FETCH_HOME_PAGE_BANNER,
    payload: res.data
  });
}


export const CREATE_BANNER = 'CREATE_BANNER';
export const createNewBanner = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/home-page-banner`,data, {
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}


export const CREATE_COUPONS = 'CREATE_COUPONS';
export const createCoupon = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/create-Coupon`,data, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  return res
}
export const CREATE_FRM = 'CREATE_FRM';
export const CREATEFRM = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/create-frm`,data, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  return res
}

export const CREATE_CFM = 'CREATE_CFM';
export const CREATECFM = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/create-cfm`,data, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  return res
}
export const CREATE_CFA = 'CREATE_CFA';
export const CREATECFA = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/create-cfa`,data, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  return res
}
export const CREATE_EQR = 'CREATE_EQR';
export const CREATEEQR = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/create-eqr`,data, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  return res
}
export const ASSIGN_COURSE = 'ASSIGN_COURSE';
export const assignCourse = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/assign-course-to-user`,data, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  return res
}
export const UN_ASSIGN_COURSE = 'UN_ASSIGN_COURSE';
export const unassignCourse = (data) => async (dispatch, getState) => {
  const res = await axios.post(`${API_URL}/remove-course-from-user`,data, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  return res
}

export const FETCH_COUPONS = 'FETCH_COUPONS';
export const fetchCoupons = () => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/coupon`, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  dispatch({
    type: FETCH_COUPONS,
    payload: res.data
  });
}
export const DELETE_COUPON = 'DELETE_COUPON';
export const deleteCoupon = (id) => async (dispatch, getState) => {
  const res = await axios.delete(`${API_URL}/deletecoupon/${id}`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}
export const DELETE_FRM = 'DELETE_FRM';

export const deleteFrm = (id) => async (dispatch, getState) => {
  const res = await axios.delete(`${API_URL}/deletefrm/${id}`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}
export const DELETE_CLA = 'DELETE_CLA';

export const deleteCla = (id) => async (dispatch, getState) => {
  const res = await axios.delete(`${API_URL}/delete-cla/${id}`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}
export const DELETE_EQR = 'DELETE_EQR'
export const deleteEqr = (id) => async (dispatch, getState) => {
  const res = await axios.delete(`${API_URL}/delete-eqr/${id}`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}
export const DELETE_CFM = 'DELETE_CFM';

export const deleteCfm = (id) => async (dispatch, getState) => {
  const res = await axios.delete(`${API_URL}/delete-cfm/${id}`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}
export const DELETE_COURSE = 'DELETE_COURSE';
export const deleteCourse = (id) => async (dispatch, getState) => {
  const res = await axios.delete(`${API_URL}/deletecourse/${id}`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}

export const FETCH_LATEST_USERS = 'FETCH_LATEST_USERS';
export const fetchLatestUsers = () => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/get-all-users?page=1`, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  dispatch({
    type: FETCH_LATEST_USERS,
    payload: {users:res.data.data}
  });
  return res.data.count
}

export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = () => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/get-all-users?cart=false`, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  dispatch({
    type: FETCH_USERS,
    payload: {users:res.data.data}
  });
}

export const fetchUsersCourses = (id) => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/get-user-cart/${id}`, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  return res.data
}

export const FETCH_NEXT_USERS = 'FETCH_NEXT_USERS';
export const fetchNextUsers = (page_no, fetching) => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/get-all-users?page=${page_no}`, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  dispatch({
    type: FETCH_NEXT_USERS,
    payload: {users:res.data.data, count: res.data.count, page_no: page_no, fetching: fetching}
  });
}
