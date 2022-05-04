
import { useEffect } from "react"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Router from 'next/router'
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"

const DashboardPage = (props) => {

  useEffect(() => {
    const { pathname } = Router
    if (pathname == '/') {
      Router.push('/pages/surveys');
    }
  }, [props]);

  return ('')

}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange },
    dispatch
  )
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(DashboardPage))
