import React, { Component } from 'react'


export default class Spinner extends Component {
  render() {
    return (
      <div  style={{textAlign:'center'}}>
        <i className="fa-duotone fa-solid fa-spinner fa-spin-pulse" style={{fontSize:'2.5rem'}}></i>
      </div>
    )
  }
}
