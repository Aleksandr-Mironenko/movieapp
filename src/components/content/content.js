import React from 'react'

import Paginatione from '../paginatione'
import SearchEngine from '../search-engine'

const Content = ({ sendRenderValue, sendRenderPage, context }) => {
  return (
    <div className="app">
      <SearchEngine sendRenderValue={sendRenderValue} />
      <div className="movieComponents">{context}</div>
      <Paginatione sendRenderPage={sendRenderPage} />
    </div>
  )
}
export default Content
