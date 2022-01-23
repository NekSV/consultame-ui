import { combineReducers } from "redux"
import sidemenuReducer from "./sidemenuReducer"
import breadcrumbReducer from "./breadcrumbReducer"
import firebaseReducer from "./firebaseReducer"
import asideReducer from "./asideReducer"
import pageReducer from "./pageReducer"

// Concatenate all reducers
const reducers = combineReducers({
  breadcrumb: breadcrumbReducer,
  sidemenu: sidemenuReducer,
  firebase: firebaseReducer,
  aside: asideReducer,
  page: pageReducer
})

export default reducers
