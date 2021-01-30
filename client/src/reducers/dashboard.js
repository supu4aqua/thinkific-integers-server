import { DASHBOARD_GET_DATA } from '../actions/types';
//import Dashboard from '../components/Dashboard';

const DEFAULT_STATE = {
  secret: ''
}

 const Dash = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case DASHBOARD_GET_DATA:
      return { ...state, secret: action.payload }
    default:
      return state
  }
}

export default Dash;