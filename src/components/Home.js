import React from 'react'
import Sidebar from '../Sidebar'

const Home = () => {
  return (
    <div className='row'>
        <div className='col-2'>
            <Sidebar/>
        </div>
        <div className='col-10'>
            <h1>das Willkommen</h1>
        </div>
    </div>
  )
}

export default Home