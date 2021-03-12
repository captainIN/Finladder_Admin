const initialState = {
    courses: [],
    categories: [],
    banners: [],
    coupons: [],
    users: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COURSE':
      return {
        ...state,
        courses: action.payload
      }
    case 'FETCH_CATEGORY':
      return {
        ...state,
        categories: action.payload
      }
    case 'FETCH_HOME_PAGE_BANNER':
      return{
        ...state,
        banners: action.payload
      }
    case 'FETCH_COUPONS':
      return{
        ...state,
        coupons: action.payload
      }
    case 'FETCH_USERS':
      return{
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
};