const initialState = {
    courses: [],
    categories: [],
    banners: [],
    coupons: [],
    Frm: [],cfm:[],cfa:[],eqr:[],
    latest_users: [],
    users: [],
    total_users: 500,
    page_no: 1,courseDetails:{},
    fetching: false,total_pages:100,count:9000
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COURSE':
      return {
        ...state,
        courses: action.payload
      }
      case 'COURSE_BY_ID':
        return {
          ...state,
          courseDetails: action.payload
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
      case 'FETCH_FRMS':
        return{
          ...state,
          Frm: action.payload
        }
        case 'FETCH_CFMS':
        return{
          ...state,
          cfm: action.payload
        }
        case 'FETCH_CFAS':
          return{
            ...state,
            cfa: action.payload
          }
          case 'FETCH_EQRS':
            return{
              ...state,
              eqr: action.payload
            }
    case 'FETCH_LATEST_USERS':
      return{
        ...state,
        latest_users: action.payload.users,
      }
    case 'FETCH_USERS':
      return{
        ...state,
        users: action.payload.users,
        total_users: action.payload.count,
        total_pages: action.payload.total_pages,
        fetching: action.payload.fetching
      }
      case 'SEARCH':
        return{
          ...state,
          users: action.payload.users,
         
          fetching: action.payload.fetching
        }
    case 'FETCH_NEXT_USERS':
      return{
        ...state,
        users: [...state.users, ...action.payload.users],
        page_no: action.payload.page_no,
        fetching: action.payload.fetching
      }
    default:
      return state;
  }
};