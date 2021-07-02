const initialState = {
    courses: [],
    categories: [],
    banners: [],
    coupons: [],
    users: [],
    total_users: 500,
    page_no: 1
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
        users: action.payload.users,
        total_users: action.payload.count,
      }
    case 'FETCH_NEXT_USERS':
      return{
        ...state,
        users: [...state.users, ...action.payload.users],
        page_no: action.payload.page_no,
      }
    default:
      return state;
  }
};