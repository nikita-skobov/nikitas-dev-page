import React from 'react'
import { connect } from 'react-redux'
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavLink as ReactstrapNavlink,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'

import { capitalize } from '../../utilities'
import { REPO_PATH_PREFIX, NAVBAR_COMPONENT_CLASS_NAME, SITE_NAME } from '../../constants'

export function NavBar() {
  return (
    <div className={NAVBAR_COMPONENT_CLASS_NAME}>
      <Navbar color="primary" light expand="md">
        <NavLink to="/">
          <NavbarBrand className="text-white">
            {SITE_NAME}
          </NavbarBrand>
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to={`/${REPO_PATH_PREFIX}/`}>
              <ReactstrapNavlink className="text-white">
                {capitalize(REPO_PATH_PREFIX)}
              </ReactstrapNavlink>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default connect()(NavBar)
