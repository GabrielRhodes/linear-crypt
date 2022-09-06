import Reader from './Reader'
import Sender from './Sender'
import Listener from './Listener'

function Intro({ setter }) {
  return (
    <div id='intro'>
      <div id='intro-text'>
        <h1>Linear Crypt</h1>
        <p>
          &emsp;&emsp;&emsp;&emsp;Linear Crypt is a simple linear algebra based
          encryption JavaScript program that can encrypt text-based messages
          with ease. Below, I will be explaining the code a bit. Feel free to
          use&emsp;
          <a href='linearCrypt.js' download={true}>
            the code
          </a>
          &emsp;in any way you wish, just be advised that it is not the safest
          encryption program, as modern encryption programs are far more secure.
        </p>
        <h2>Encryption Process</h2>
        <p>
          &emsp;&emsp;&emsp;&emsp;Linear Crypt is an object based encryption
          module. You can start by creating a LinearCrypter object
          <br />
          <code>var crypter = new LinearCrypter(size, channel, salt)</code>
          Size: The size of the matrix used in encryption. If set to 3, a
          message is split into chunks of 3 characters to create a nx3 matrix
          (all extra spaces are filled with 0) Cap at 10 for performance
          reasons. Defaults to 5
          <br />
          Channel: A Channel number determined securely on your own. You can use
          a primitive root process to determine this securely. Defaults to 10.
          <br />
          Salt: The number of elementary matrices used for encryption. Cap at
          100. Defaults to 10.
          <br />
          <br />
          &emsp;&emsp;&emsp;&emsp;Now that you have your object, you can encrypt
          a single message by calling:
          <br />
          <code>crypter.encrypt('Hello World!')</code>
          This will return a matrix object. The matrix object has 3 readable
          values, namely length, width, and matrix. The length is the length of
          the matrix and width being the width of the matrix. The matrix is a 2d
          array containing all values in the matrix (where arr[2][3] is the
          value in the 3rd row and 4th column. Recall array notation starts at
          0.)
          <br />
          <br />
          &emsp;&emsp;&emsp;&emsp;To decrypt a message, you can call <br />
          <code>crypter.decrypt(MATRIX)</code>
          This will return a string with the decrypted message. You can decrypt
          a matrix into a string using this function, but keep in mind the
          decryption crypter object must have the same paramaters as the
          encryption one. Meaning you and the person you're sending a message to
          must have the same crypter paramaters. Otherwise, you will get a
          jumbled up mess of characters.
        </p>
        <h2>Extra Functions</h2>
        <p>
          There is a pretty print function that can print matrices a bit better.
          <br />
          <code>matrix.prettyPrint(num)</code>
          The num paramater allows you to allocate space if you may have a
          number with a lot of digits. It defaults to 5.
          <br />
          <br />
          There is also a inverse function that comes with the matrix object,
          which can find the inverse of a matrix.
          <br />
          <code>matrix.inverse()</code>
          Be aware that a larger matrix will take a significantly longer time to
          solve for. Determinants are an exponential process in terms of
          calculations, and adjoints involve a large number of determinants.
        </p>
        <p>
          Below are a couple of 'encryption games' I've made so that you can
          test out linear crypt a bit. The first two are simple reader sender,
          whereas the third is where you try to decrypt the messages. I don't
          recommend spending too much time on it, since it seems like it would
          make a person lose their sanity.
        </p>
      </div>
      <div id='intro-nav' className='block-nav'>
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
      </div>
    </div>
  )
}

export default Intro
