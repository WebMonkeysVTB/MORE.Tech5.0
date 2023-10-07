import { Empty } from 'antd'
import React from 'react'
import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <div className='notFoundDiv'>
        <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
            <h2>No such page :(</h2>
            }
    >
    </Empty>
    </div>
  )
}

export default NotFoundPage