import React from 'react'
import { connect } from 'react-redux'
import {
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'

import { capitalize } from '../../utilities'
import { REPO_PATH_PREFIX, NAVBAR_COMPONENT_CLASS_NAME, SITE_NAME } from '../../constants'

export function NavBar() {
  return (
    <div className={NAVBAR_COMPONENT_CLASS_NAME}>
      <Navbar color="primary">
        <NavLink to="/">
          <div className="text-white navbar-brand">
            {SITE_NAME}
          </div>
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to={`/${REPO_PATH_PREFIX}`}>
              <div className="text-white nav-link">
                {capitalize(REPO_PATH_PREFIX)}
              </div>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default connect()(NavBar)
