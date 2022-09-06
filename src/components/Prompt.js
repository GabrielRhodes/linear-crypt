function Prompt({ prompt, cleanup, mode }) {
  const prompts =
    mode === 'listener'
      ? [
          <>
            <button onClick={() => cleanup()}>Get Paramaters</button>
          </>,
          <>
            <button onClick={() => cleanup()}>See Public Key</button>
          </>,
          <>
            <button onClick={() => cleanup()}>See Other Key</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Get Chunker and Salt Info</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Hear Message</button>
          </>,
          <>
            <input id='message-input' />
            <button onClick={() => cleanup()}>Guess</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Get Result</button>
          </>,
          <></>,
        ]
      : [
          <>
            <label>Pick A Private Channel Between 3 and 1000: </label>
            <input
              id='channel-number'
              type='number'
              min={3}
              max={1000}
              defaultValue={Math.round(Math.random() * 997) + 3}
            />
            <button onClick={() => cleanup()}>Submit Channel</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Recieve Public Channel</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Calculate Public Channel</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Calculate Private Channel</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Get Paramaters</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Create Crypter</button>
          </>,
          <>
            {mode === 'sender' ? (
              <input id='message-input' defaultValue='Hello World' />
            ) : null}
            <button onClick={() => cleanup()}>Get Message</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Enter Message</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Textify Message</button>
          </>,
          <></>,
        ]
  return (
    <>
      {prompts[prompt] ||
        'Whoops, looks like there was an error...you either wanted to create an error and got what you wanted, or I am sorry and recommend reloading and trying again.'}
    </>
  )
}

export default Prompt
