import axios from 'axios'

// const API_URL = "https://udemy-adminside.herokuapp.com"
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

export const DELETE_COURSE = 'DELETE_COURSE';
export const deleteCourse = (id) => async (dispatch, getState) => {
  const res = await axios.delete(`${API_URL}/deletecourse/${id}`,{
    headers: {Authorization: `${getState().auth.token}`}
  });
  return res
}

export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = () => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/get-all-users?page=1`, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  dispatch({
    type: FETCH_USERS,
    payload: {users:res.data.data, count: res.data.count}
  });
  return res.data.count
}

export const FETCH_NEXT_USERS = 'FETCH_NEXT_USERS';
export const fetchNextUsers = (page_no) => async (dispatch, getState) => {
  const res = await axios.get(`${API_URL}/get-all-users?page=${page_no}`, {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `${getState().auth.token}`
    }
  });
  dispatch({
    type: FETCH_NEXT_USERS,
    payload: {users:res.data.data, count: res.data.count, page_no: page_no}
  });
}
