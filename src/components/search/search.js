import React, { Component } from 'react'

import MovieComponent from '../movie-component'
import Service from '../servise'
import Spinner from '../spinner'
import Allert from '../allert'
import Ofline from '../offline'
import Content from '../content'
import DataEmpty from '../data-empty'
import FindPlease from '../find-please'
import '../app/App.css'

export default class Search extends Component {
  service = new Service()

  state = {
    data: [],
    loading: true,
    error: false,
    line: true,
    value: '',
    page: 1,
    dataEmpty: false,
  }

  peredPeremSort = (id, stars) => {
    const data = this.state.data
    if (data.length > 0) {
      const isscomiyEl = data.find((el) => el.id === id)
      if (id) {
        isscomiyEl.stars = isscomiyEl.stars === stars ? 0 : stars

        if (!localStorage.getItem('dataStarsArray')) {
          const dataStarsArray = [isscomiyEl]

          localStorage.setItem('dataStarsArray', JSON.stringify(dataStarsArray))
        } else {
          const dataStarsArray = JSON.parse(localStorage.getItem('dataStarsArray'))

          const findObject = dataStarsArray.find((el) => el.id === id)
          if (findObject) {
            const newDataStarsArray = dataStarsArray.map((el) => (el.id === id ? { ...el, stars: stars } : el))
            localStorage.setItem('dataStarsArray', JSON.stringify(newDataStarsArray))
          } else {
            const newDataStarsArray = [...dataStarsArray, isscomiyEl]
            localStorage.setItem('dataStarsArray', JSON.stringify(newDataStarsArray))
          }
        }
      }
    }
    const proverka = JSON.parse(localStorage.getItem('dataStarsArray'))
    if (proverka && proverka.find((el) => el.stars === 0)) {
      const newDataStarsArray = proverka.filter((el) => el.stars !== 0)

      localStorage.removeItem('dataStarsArray')

      localStorage.setItem('dataStarsArray', JSON.stringify(newDataStarsArray))
    }
  }

  componentDidMount() {
    this.renderMovie(this.state.value, this.state.page)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page ||
      prevProps.peredId !== this.props.peredId ||
      prevProps.peredStars !== this.props.peredStars
    ) {
      this.peredPeremSort(this.props.peredId, this.props.peredStars)
      this.renderMovie(this.state.value, this.state.page)
      this.listenerOnline()
    }
  }

  onMovieListLoaded = (movies) => {
    movies.length
      ? this.setState({ data: movies, loading: false, dataEmpty: false })
      : this.setState({ dataEmpty: true, loading: false })
  }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  sendRenderValue = (value) => {
    this.setState({ value: value, page: 1 })
  }

  sendRenderPage = (page) => {
    this.setState({ page: page })
  }

  renderMovie = (value, page) => {
    this.setState({ loading: true })
    this.service.getMovie(value, page).then(this.onMovieListLoaded).catch(this.onError)
  }

  listenerOnline = () => {
    window.addEventListener('offline', (e) => {
      this.setState({ line: false, loading: false, error: false })
    })
    window.addEventListener('online', (e) => {
      this.setState({ line: true })
    })
  }

  render() {
    const elements = this.state.data.map((item, index) => {
      return <MovieComponent peredPeremSort={this.peredPeremSort} key={index} {...item} />
    })

    const { loading, error, line, dataEmpty } = this.state

    const spinner = loading ? <Spinner /> : null
    const onOffline = !line ? <Ofline /> : null
    const err = error ? <Allert className="errorEl" /> : null

    const hasData = !(loading, error, onOffline)
    const context = !dataEmpty ? elements : <DataEmpty />
    const findPlease = this.state.value ? context : <FindPlease />

    const content = hasData ? (
      <Content
        id="search"
        sendRenderValue={this.sendRenderValue}
        sendRenderPage={this.sendRenderPage}
        context={findPlease}
      />
    ) : null

    return (
      <React.Fragment>
        {onOffline}
        {err}
        {spinner}
        {content}
      </React.Fragment>
    )
  }
}
