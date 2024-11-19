import React from 'react'
import { Pagination } from 'antd'

const Paginatione = ({ sendRenderPage }) => {
  const upSendRenderPage = (page) => {
    sendRenderPage(page)
  }
  return <Pagination className="paginatione" onChange={upSendRenderPage} defaultCurrent={1} total={500} />
}
export default Paginatione
