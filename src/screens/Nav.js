import Home from './Home'
import Sender from './Sender'
import Reader from './Reader'
import Listener from './Listener'
import Intro from './Intro'

function Nav({ setter }) {
  return (
    <>
      <nav id='nav-bar'>
        <h2 onClick={() => setter(<Home setter={setter} />)}>LinearCrypt</h2>
        <div onClick={() => setter(<Intro setter={setter} />)}>Intro</div>
        <div onClick={() => setter(<Reader />)}>Reader</div>
        <div onClick={() => setter(<Sender />)}>Sender</div>
        <div onClick={() => setter(<Listener />)}>Listener</div>
      </nav>
    </>
  )
}

export default Nav
