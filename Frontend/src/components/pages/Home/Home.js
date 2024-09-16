import React from 'react'
import Layout from '../../Layout/Layout'
import Section1 from './Section1'
import Section2 from './Section2'

function Home() {
  return (
    <>
      <Layout>
        {/* Hero Section*/ }
        <Section1 />

        {/*About Section of Home*/}
        <Section2/>
      </Layout>
    </>
  )
}

export default Home
