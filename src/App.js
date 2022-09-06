import Nav from './screens/Nav'
import Home from './screens/Home'
import { useState, useEffect } from 'react'

function App() {
  const [view, setview] = useState()
  useEffect(() => {
    setview(<Home setter={setview} />)
  }, [])

  return (
    <>
      <Nav setter={setview} />
      {view}
      {/* <div id='lower-text'>An encryption JS module made by Gabriel Rhodes</div> */}
    </>
  )
}

export default App
