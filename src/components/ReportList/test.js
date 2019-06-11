/* global expect it describe beforeEach */
import * as React from 'react'
// eslint-disable-next-line
import { shallow, mount } from 'enzyme'

import { ReportList } from './index'
import {
  REPORT_LIST_COMPONENT_CLASS_NAME,
  REPORT_ITEM_COMPONENT_CLASS_NAME,
} from '../../constants'


describe('Report List component', () => {
  let latest = {
    data: {
      build_number: 4,
      current_commit: 'dsadsa',
    },
  }

  beforeEach(() => {
    latest = {
      data: {
        build_number: 4,
        current_commit: 'dsadsa',
      },
    }
  })

  it('should render if reportData exists', () => {
    const wrapper = mount(
      <ReportList
        reportData={{ latest }}
      />,
    )
    expect(wrapper.find(`.${REPORT_LIST_COMPONENT_CLASS_NAME}`).exists()).toBeTruthy()
  })

  it('should not render if reportData does not exist', () => {
    const wrapper = mount(
      <ReportList reportData={undefined} />,
    )

    expect(wrapper.html()).toEqual(null)
  })

  it('should render a Load More button that is disabled if there are less than 10 builds', () => {
    const wrapper = mount(
      <ReportList
        reportData={{ latest }}
      />,
    )

    const button = wrapper.find('.btn')
    expect(button.getElement().props.disabled).toEqual(true)
  })

  it('should render a Load More button that is NOT disabled if there are more than 10 builds', () => {
    latest.data.build_number = 20
    const wrapper = mount(
      <ReportList
        reportData={{ latest }}
      />,
    )

    const button = wrapper.find('.btn')
    expect(button.getElement().props.disabled).toEqual(false)
  })

  it('should render only 1 report item if reportData latest build_number is 1', () => {
    latest.data.build_number = 1
    const wrapper = mount(
      <ReportList
        reportData={{ latest }}
      />,
    )

    expect(wrapper.find(`.${REPORT_ITEM_COMPONENT_CLASS_NAME}`).hostNodes()).toHaveLength(1)
  })

  it('should only render 10 report items by default even if reportData latest build number is > 10', () => {
    latest.data.build_number = 20
    const wrapper = mount(
      <ReportList
        reportData={{ latest }}
      />,
    )

    expect(wrapper.find(`.${REPORT_ITEM_COMPONENT_CLASS_NAME}`).hostNodes()).toHaveLength(10)
  })

  it('should only render 10 more report items if the load more button is clicked', () => {
    latest.data.build_number = 20
    const wrapper = mount(
      <ReportList
        reportData={{ latest }}
      />,
    )

    expect(wrapper.find(`.${REPORT_ITEM_COMPONENT_CLASS_NAME}`).hostNodes()).toHaveLength(10)
    wrapper.find('.btn').simulate('click')
    expect(wrapper.find(`.${REPORT_ITEM_COMPONENT_CLASS_NAME}`).hostNodes()).toHaveLength(20)
  })
})
