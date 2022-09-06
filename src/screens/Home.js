import Sender from './Sender'
import Reader from './Reader'
import Listener from './Listener'
import Intro from './Intro'

function Home({ setter }) {
  return (
    <div id='home'>
      <h1>Linear Crypt</h1>
      <h3>
        An encryption module created with JavaScript and Linear Algebra
        fundamentals.
      </h3>
      <div className='block-nav' id='home-nav'>
        <button
          id='intro-block'
          onClick={() => setter(<Intro setter={setter} />)}
        >
          <h3>Intro:</h3>
          <p>
            Learn how Linear Crypt works to encrypt messages quickly with a
            linear algebra encryption method, as well as how the encryption game
            works.
          </p>
        </button>
        <button onClick={() => setter(<Reader />)}>
          <h3>Reader:</h3>
          <p>
            Play the encryption game as the reader. Watch how Linear Crypt
            decodes messages sent to you.
          </p>
        </button>
        <button onClick={() => setter(<Sender />)}>
          <h3>Sender:</h3>
          <p>
            Play the encryption game as the sender. Watch how your message is
            encrypted and sent.
          </p>
        </button>
        <button onClick={() => setter(<Listener />)}>
          <h3>Listener:</h3>
          <p>
            Play as a third-party listener and try to guess the message sent.
            Hopefully it's more than a little difficult to do!
          </p>
        </button>
        <em>Recommended</em>
      </div>
    </div>
  )
}

export default Home
