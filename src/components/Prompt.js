function Prompt({ prompt, cleanup, mode }) {
  function Next() {
    return <button onClick={() => cleanup()}>Next</button>
  }

  const prompts =
    mode === 'listener'
      ? [
          <Next />,
          <Next />,
          <Next />,
          <Next />,
          <Next />,
          <>
            <input id='message-input' />
            <button onClick={() => cleanup()}>Guess</button>
          </>,
          <>
            <button onClick={() => cleanup()}>Check</button>
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
            <Next />,
          </>,
          <Next />,
          <Next />,
          <Next />,
          <Next />,
          <Next />,
          <>
            {mode === 'sender' ? (
              <input id='message-input' defaultValue='Hello World' />
            ) : null}
            <Next />,
          </>,
          <Next />,
          <>
            <button onClick={() => cleanup()}>Complete</button>
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
