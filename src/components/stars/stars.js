import React, { Component } from 'react'
import { Rate } from 'antd'

export default class Stars extends Component {
  all = (stars) => {
    this.props.peredPeremSort(this.props.id, stars)
  }
  render() {
    const value = localStorage.getItem('dataStarsArray')
      ? JSON.parse(localStorage.getItem('dataStarsArray')).find((el) => el.id === this.props.id)?.stars
      : null
    return (
      <div className="stars">
        <Rate style={{ fontSize: 20 }} allowHalf onChange={this.all} count={10} defaultValue={value} />
      </div>
    )
  }
}
