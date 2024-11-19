import React from 'react'

import kart from './picture.png'

const ElementError = () => {
  return (
    <React.Fragment>
      <img alt="картинка" src={kart} />
      <p className="errText">Мы скоро все починим!</p>
    </React.Fragment>
  )
}
export default ElementError
