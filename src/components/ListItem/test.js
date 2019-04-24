/* global expect describe it */
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// eslint-disable-next-line
import { mount } from 'enzyme'


import { ListItem } from './index'

describe('ListItem component', () => {
  it('should render', () => {
    const wrapper = mount(<Router><ListItem /></Router>)
    expect(wrapper.find('.list-item').exists()).toBeTruthy()
  })

  it('should have a navlink to the repository component', () => {
    const repoName = 'some-repo-name'
    const wrapper = mount(
      <Router>
        <ListItem name={`${repoName}`} html_url="https://github.com/nikita-skobov/backend-frontend-template" />
      </Router>,
    )
    expect(wrapper.html()).toMatch(`<a href="/repo/${repoName}">`)
  })
})
