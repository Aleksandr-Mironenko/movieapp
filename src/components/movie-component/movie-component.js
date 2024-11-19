import React, { Component } from 'react'
import { format } from 'date-fns'

import Stars from '../stars'
import ButtonGenre from '../button-genre'
//
import { GanresContext } from '../api-data-context'

export default class MovieComponent extends Component {
  getOver = (str) => {
    if (str && str.length > 150) {
      const str1 = str.substring(0, 150)
      const endIndex = str1.lastIndexOf(' ')
      const str2 = str1.substring(0, endIndex)
      return str2 + '...'
    } else if (str) {
      return str
    } else {
      return ''
    }
  }

  render() {
    const { peredPeremSort, poster, title, release, overview, average, id, genreArr } = this.props
    const formated = release ? format(new Date(release), 'Pp') : ''

    const color =
      average < 3
        ? '#E90000'
        : average > 3 && average < 5
          ? '#E97E00'
          : average > 5 && average < 7
            ? '#E9D100'
            : '#66E900'

    const styleCircle = {
      border: `solid 2px ${color}`,
    }

    const genreButton = genreArr || []

    const overView =
      this.getOver(overview ? overview : '') ||
      'Позже мы обязательно добавим описание а пока вы можете надеяться на удачу'

    return (
      <GanresContext.Consumer>
        {(listGenre) => {
          console.log(listGenre)
          let buttons = genreButton.map((id, index) => {
            const current = listGenre.find((el) => el.id === id)

            const genreName = current ? current.name : ''

            return <ButtonGenre key={index} name={genreName} />
          })

          return (
            <div className="nd">
              <img className="picpure" src={poster} alt="poster" />
              <div className="text">
                <h1 className="title">{title}</h1>
                <p className="releaze">{formated}</p>
                <div className="buttons">{buttons}</div>

                <div className="overview">{overView}</div>
                <div className="circle" style={styleCircle}>
                  {average ? average.toFixed(1) : 0.0}
                </div>
                <Stars id={id} peredPeremSort={peredPeremSort} />
              </div>
            </div>
          )
        }}
      </GanresContext.Consumer>
    )
  }
}
