function Prompt({ prompt, cleanup, mode }) {
  function Next() {
    return <button onClick={() => cleanup()}>Next</button>
  }

  const prompts =
    mode === 'listener'
      ? [
          <>
            <p>
              Well, you're ready to graduate. Looks like you've grown into an
              encryption machine. But now the final test. Can you decrypt a
              message? This should prove difficult I hope.
            </p>
            <div>
              <label>Continue:</label>
            </div>
            <Next />
          </>,
          <>
            <p></p>
            <div>
              <label>Continue:</label>
            </div>
            <Next />
          </>,
          <>
            <p></p>
            <div>
              <label>Continue:</label>
            </div>
            <Next />
          </>,
          <>
            <p></p>
            <div>
              <label>Continue:</label>
            </div>
            <Next />
          </>,
          <>
            <p></p>
            <div>
              <label>Continue:</label>
            </div>
            <Next />
          </>,
          <>
            <input id='message-input' />
            <button onClick={() => cleanup()}>Guess</button>
          </>,
          <>
            <p>
              I hope you enjoyed this project and learned how it works a bit,
              even if you've never coded before. If you want to use LinearCrypt,
              feel free to check out the code{' '}
              <a href='https://github.com/GabrielRhodes/linear-crypt/tree/main/src/linear-crypt'>
                here
              </a>{' '}
              and have a blast!
            </p>
            <div></div>
          </>,
        ]
      : mode === 'sender'
      ? [
          <>
            <p>
              When beginning encryption, both the sender and receiver have to
              select private channels on their own. While this is normally
              handled for you in apps with encryption, it's an important step to
              the process. Normally a private channel has a large range of
              possible options, but for the sake of simplicity, let's just go
              with 3 to 1000!
            </p>
            <div>
              <label>Pick A Private Channel Between 3 and 1000: </label>
              <input
                id='channel-number'
                type='number'
                min={3}
                max={1000}
                defaultValue={Math.round(Math.random() * 997) + 3}
              />
            </div>
            <Next />
          </>,
          <>
            <p>
              Now that we've set a private code, the next step is to share
              public keys with our friend, or in this case, computer. Public
              keys are calculated by doing the following: P ^ a % N. P is a
              primitive root of N and a is the private key you've selected.
              We've preset P and N, since they would also be used for another
              person communicating to their friend at the same time. If you
              could change the P and N values, you would ruin other
              communications. Now, exchange public keys!
            </p>
            <div>
              <label>Continue: </label>
            </div>
            <Next />
          </>,
          <>
            <p>
              We've been given a new number to work with: our friend's public
              key! Now, here's where the magic begins. If you do the math B ^ a
              % N where B is the public key of your friend, you will get the
              same result as them when they do the math A ^ b % N. If you're a
              math nerd, enjoy chewing on that, if not, then just know that it
              always works so long as P is a primitive root of N (you can find
              plenty of primitive root calculators out there if you want). Now
              we can calculate the private channel so that we can communicate
              with our friend in private.
            </p>
            <div>
              <label>Continue: </label>
            </div>
            <Next />
          </>,
          <>
            <p>
              LinearCrypt uses special properties called a chunker and salt
              along with your private channel to encrypt messages. Since
              LinearCrypt is based in linear algebra, we use matrices to
              communicate messages. To turn a string into a matrix though, we
              convert each character into it's ASCII value (just a fancy way to
              turn letters to numbers). Then, with the long list of numbers, we
              fill out a matrix going up and down each column. The chunker lets
              us know how large each column is. Then we have the salt! Salt is
              the amount of sauce we want to add to the dish that is our
              message. Adding one to the salt adds one to the matrix operations
              we do when scrambling the matrix up! If you want to see how that's
              done, check out{' '}
              <a href='https://github.com/GabrielRhodes/linear-crypt/tree/main/src/linear-crypt'>
                the code
              </a>
              !
            </p>
            <div>
              <label>Continue: </label>
            </div>
            <Next />
          </>,
          <>
            <p>
              Looks like we've got the salt and chunker values. We'll add them
              into our linearcryptmachine3000 for you real
              quick...beep...boop...beep...bop, done! I would add an input for
              you to do it, but I figured that would just be annoying at some
              level. Now it's your turn to send a message! What will it be...
            </p>
            <div>
              <label>Enter a Message: </label>
              <input id='message-input' defaultValue='Hello World' />
            </div>
            <Next />
          </>,
          <>
            <p>
              Alright! Now it's the computer's turn to figure out what you sent.
              They'll now enter the matrix you sent them into their own
              linearcryptmachine3000 and run the decrypt function. Let's see if
              they get the right result.
            </p>
            <div>
              <label>Continue: </label>
            </div>
            <Next />
          </>,
          <>
            <p>
              Look at that! It works! Or you did something you weren't supposed
              to such as...oh I don't know, adding characters with REALLY high
              ASCII's, or maybe editing the code directly in inspect element.
              Really, you could have probably done any number of things. If you
              did...congrats. If you didn't, I hope you better understand
              encryption now! If you did...honestly cool. Well, been fun writing
              this but I want to be done with this project so byeee!
            </p>
            <div>
              <label>We outttt</label>
            </div>
          </>,
        ]
      : [
          <>
            <p>
              When beginning encryption, both the sender and receiver have to
              select private channels on their own. While this is normally
              handled for you in apps with encryption, it's an important step to
              the process. Normally a private channel has a large range of
              possible options, but for the sake of simplicity, let's just go
              with 3 to 1000!
            </p>
            <div>
              <label>Pick A Private Channel Between 3 and 1000: </label>
              <br />
              <input
                id='channel-number'
                type='number'
                min={3}
                max={1000}
                defaultValue={Math.round(Math.random() * 997) + 3}
              />
            </div>
            <Next />
          </>,
          <>
            <p>
              Now that we've set a private code, the next step is to share
              public keys with our friend, or in this case, computer. Public
              keys are calculated by doing the following: P ^ a % N. P is a
              primitive root of N and a is the private key you've selected.
              We've preset P and N, since they would also be used for another
              person communicating to their friend at the same time. If you
              could change the P and N values, you would ruin other
              communications. Now, exchange public keys!
            </p>
            <div>
              <label>Continue: </label>
            </div>
            <Next />
          </>,
          <>
            <p>
              We've been given a new number to work with: our friend's public
              key! Now, here's where the magic begins. If you do the math B ^ a
              % N where B is the public key of your friend, you will get the
              same result as them when they do the math A ^ b % N. If you're a
              math nerd, enjoy chewing on that, if not, then just know that it
              always works so long as P is a primitive root of N (you can find
              plenty of primitive root calculators out there if you want). Now
              we can calculate the private channel so that we can communicate
              with our friend in private.
            </p>
            <div>
              <label>Continue: </label>
            </div>
            <Next />
          </>,
          <>
            <p>
              LinearCrypt uses special properties called a chunker and salt
              along with your private channel to encrypt messages. Since
              LinearCrupt is based in linear algebra, we use matrices to
              communicate messages. To turn a string into a matrix though, we
              convert each character into it's ASCII value (just a fancy way to
              turn letters to numbers). Then, with the long list of numbers, we
              fill out a matrix going up and down each column. The chunker lets
              us know how large each column is. Then we have the salt! Salt is
              the amount of sauce we want to add to the dish that is our
              message. Adding one to the salt adds one to the matrix operations
              we do when scrambling the matrix up! If you want to see how that's
              done, check out{' '}
              <a href='https://github.com/GabrielRhodes/linear-crypt/tree/main/src/linear-crypt'>
                the code
              </a>
              !
            </p>
            <div>
              <label>Continue: </label>
            </div>
            <Next />
          </>,
          <>
            <p>
              Looks like we've got the salt and chunker values. We'll add them
              into our linearcryptmachine3000 for you real
              quick...beep...boop...beep...bop, done! I would add an input for
              you to do it, but I figured that would just be annoying at some
              level. So now your friend is about to send you a message. The
              computer has the same private message as you, so you should both
              be able to read it once it's been decrypted!
            </p>
            <div>
              <label>Continue: </label>
            </div>
            <Next />
          </>,
          <>
            <p>
              Oh boy it's...it's...scrambled. Looks like we have to pull out the
              trusty linearcryptmachine3000 to decrypt this mess. Because
              matrices are...let's say awesome I guess, we can undo the
              encryption by finding the inverse of our encryption matrix. If
              that sounds like a headache, don't worry! This is why we have
              computers to do it for us. Technology. So we just run the decrypt
              function on our linearcryptmachine3000 and enter that jumbled up
              matrix to get:{' '}
            </p>
            <div>
              <label>Decrypt: </label>
            </div>
            <Next />
          </>,
          <>
            <p>
              Wow! Your friend is nice to say Hello World like that. Well...hope
              you had fun? Idk, this was a fun project but there's only so much
              I can explain before going really deep into coding and math, so I
              tried to keep it light. Hope I was able to make it fun and maybe
              even teach you something. I don't really care what you do with my
              code if you use it, so don't worry about remembering to credit or
              stuff like that. Do not...I repeat, DO NOT expect this to securely
              encrypt information such as a social security number. Linear
              Algebra fell out of the encryption world a long time ago. Now it's
              all about those cool lambda functions. Anyway, rant over. Have a
              good day!
            </p>
            <div>
              <label>We outttt</label>
            </div>
          </>,
        ]
  return (
    <>
      {prompts[prompt] ||
        'Whoops, looks like there was an error...you either wanted to create an error and got what you wanted, or I am sorry and recommend reloading and trying again.'}
    </>
  )
}

export default Prompt
