import React from 'react'
import { CloseSquareFilled } from '@ant-design/icons'
import { Alert } from 'antd'

const onClose = (e) => {
  console.log(e, 'I was closed.')
}

const Allert = () => {
  return (
    <Alert
      message="Нет подключения к серверу"
      description="Причиной ошибки может быть выключеный VPN"
      type="error"
      closable={{
        'aria-label': 'close',
        closeIcon: <CloseSquareFilled />,
      }}
      onClose={onClose}
    />
  )
}
export default Allert
