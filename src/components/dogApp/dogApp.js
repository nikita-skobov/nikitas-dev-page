import React from 'react'
import { connect } from 'react-redux'
import fetchDog from '../../actions/fetchDog/fetchDog'
import RandomDog from '../randomDog/randomDog'
import './dogApp.css'

export function DogApp(props) {
  // eslint-disable-next-line
  const fd = props.fetchDog
  // eslint-disable-next-line
  const du = props.dogUrl

  return (
    <div className="app-container">
      <RandomDog
        fetchDog={fd}
        dogUrl={du}
      />
    </div>
  )
}


const mapProps = state => ({ dogUrl: state.dog.url })

const mapDispatch = {
  fetchDog,
}

export default connect(mapProps, mapDispatch)(DogApp)
