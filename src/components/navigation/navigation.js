import React, { Component } from 'react'
import { Anchor } from 'antd'

export default class Navigation extends Component {
  handleClick = (e, link) => {
    e.preventDefault()
    console.log(link.title)
    this.props.onChangeNavigator(link.title)
  }

  render() {
    const items = [
      { key: 'Search', href: '#search', title: 'Search' },
      { key: 'Rated', href: '#rated', title: 'Rated' },
    ]

    return (
      <div style={{ padding: '20px' }}>
        <Anchor affix={false} direction="horizontal" onClick={this.handleClick} items={items} />
      </div>
    )
  }
}
