import {
  Badge,
  Button,
  Avatar,
  GridNav,
  Portlet,
  Dropdown,
  RichList,
  Widget16
} from "@blueupcode/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { bindActionCreators } from "redux"
import { firebaseClient } from "components/firebase/firebaseClient"
import { firebaseChange } from "store/actions"
import { Component } from "react"
import { connect } from "react-redux"
import { swal } from "components/swal/instance"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Router from "next/router"
import PAGE from "config/page.config"

class HeaderUser extends Component {
  state = {
    avatar: () => (
      <Avatar variant="label-light" display circle>
        <FontAwesomeIcon icon={SolidIcon.faUserAlt} />
      </Avatar>
    ),
    name: "Guest",
    email: "No email",
    count: 6,
    navs: [
      [
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faAddressCard} />,
          title: "Profile"
        },
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faComments} />,
          title: "Messages"
        },
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faClone} />,
          title: "Activities"
        }
      ],
      [
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faCalendarCheck} />,
          title: "Tasks"
        },
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faStickyNote} />,
          title: "Notes"
        },
        {
          icon: () => <FontAwesomeIcon icon={RegularIcon.faBell} />,
          title: "Notification"
        }
      ]
    ]
  }

  handleSignOut = () => {
    // Try to signing out
    firebaseClient
      .auth()
      .signOut()
      .then(() => {
        // Redirect to login page and remove firebase data from state management
        this.props.firebaseChange(null)
        Router.push(PAGE.loginPagePath)
      })
      .catch((err) => {
        // Show error message with SweetAlert
        swal.fire({ text: err.message, icon: "error" })
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.firebase !== prevProps.firebase) {
      // Check whether user has logged in
      if (this.props.firebase) {
        const { name, email } = this.props.firebase

        // Set the component state
        this.setState({
          ...this.state,
          name,
          email
        })
      }
    }
  }

  render() {
    const { avatar: WidgetAvatar, name, email, count, navs } = this.state
    // eslint-disable-next-line no-unused-vars
    const { firebase, firebaseChange, ...attributes } = this.props

    return (
      <Dropdown.Uncontrolled {...attributes}>
        <Widget16 dropdown variant="flat-primary">
          <Widget16.Text>
            Hi <strong>User</strong>
          </Widget16.Text>
          {/* BEGIN Avatar */}
          <Widget16.Avatar display variant="info">
            <FontAwesomeIcon icon={SolidIcon.faUserAlt} />
          </Widget16.Avatar>
          {/* END Avatar */}
        </Widget16>
        <Dropdown.Menu wide right animated className="overflow-hidden py-0">
          {/* BEGIN Portlet */}
          <Portlet scroll className="border-0">
            <Portlet.Header className="bg-primary rounded-0">
              {/* BEGIN Rich List */}
              <RichList.Item className="w-100 p-0">
                <RichList.Addon addonType="prepend">
                  <WidgetAvatar />
                </RichList.Addon>
                <RichList.Content>
                  <RichList.Title className="text-white">{name}</RichList.Title>
                  <RichList.Subtitle className="text-white">
                    {email}
                  </RichList.Subtitle>
                </RichList.Content>
                <RichList.Addon addonType="append">
                  <Badge variant="warning" shape="square" size="lg">
                    {count}
                  </Badge>
                </RichList.Addon>
              </RichList.Item>
              {/* END Rich List */}
            </Portlet.Header>
            <Portlet.Body className="p-0">
              {/* BEGIN Grid Nav */}
              <GridNav flush action noRounded>
                {navs.map((nav, index) => (
                  <GridNav.Row key={index}>
                    {nav.map((data, index) => {
                      const { icon: Icon, title } = data

                      return (
                        <GridNav.Item key={index} icon={<Icon />}>
                          {title}
                        </GridNav.Item>
                      )
                    })}
                  </GridNav.Row>
                ))}
              </GridNav>
              {/* END Grid Nav */}
            </Portlet.Body>
            <Portlet.Footer bordered className="rounded-0">
              <Button variant="label-danger" onClick={this.handleSignOut}>
                Sign out
              </Button>
            </Portlet.Footer>
          </Portlet>
          {/* END Portlet */}
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    )
  }
}

function mapStateToProps(state) {
  return {
    firebase: state.firebase
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ firebaseChange }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser)
