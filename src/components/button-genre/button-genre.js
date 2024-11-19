import React, { Component } from 'react'

export default class ButtonGenre extends Component {
  render() {
    const { name } = this.props
    return <button className="button">{name} </button>
  }
}
