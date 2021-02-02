import { DASHBOARD_GET_DATA } from '../actions/types';
//import Dashboard from '../components/Dashboard';

const DEFAULT_STATE = {
  current_integer: ''
}

 const Dash = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case DASHBOARD_GET_DATA:
      return { ...state, current_integer: action.payload }
    default:
      return state
  }
}

export default Dash;