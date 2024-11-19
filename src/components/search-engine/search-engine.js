import React, { Component } from 'react'
import { Input } from 'antd'
import _ from 'lodash'

export default class SearchEngine extends Component {
  state = { value: '' }

  inputChange = (event) => {
    const newValue = event.target.value
    this.setState({ value: newValue })
    this.onChange(newValue)
  }

  onChange = _.debounce((value) => {
    this.props.sendRenderValue(value)
  }, 1500)

  render() {
    return <Input id="input" placeholder="Type to search..." value={this.state.value} onChange={this.inputChange} />
  }
}
