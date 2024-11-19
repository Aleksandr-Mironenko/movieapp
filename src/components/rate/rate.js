import React, { Component } from 'react'

import MovieComponent from '../movie-component'
import Service from '../servise'
import FindPlease from '../find-please'

import '../app/App.css'

export default class Rate extends Component {
  service = new Service()

  state = {
    movies: [],
    dataEmpty: false,
  }
  re = () => {
    const movies = JSON.parse(localStorage.getItem('dataStarsArray')) || []

    if (movies.length !== 0) {
      console.log(movies, this.state.dataEmpty)
      this.setState({ movies: movies, dataEmpty: false })
    } else {
      this.setState({ dataEmpty: true })
    }
  }

  componentDidMount() {
    this.re()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movies !== this.state.movies && prevState.dataEmpty !== this.state.dataEmpty) {
      this.re()
    }
  }
  render() {
    const filter = this.state.movies.filter((movie) => movie.stars !== 0)
    const elements = filter.map((item, index) => {
      return <MovieComponent peredPeremSort={this.props.peredPeremSort} key={index} {...item} />
    })

    const rated = (
      <div id="rated" className="app">
        <div id="rated" className="movieComponents">
          {elements}
        </div>
      </div>
    )
    const content = this.state.dataEmpty ? <FindPlease className="findPlease" /> : rated
    return content
  }
}
