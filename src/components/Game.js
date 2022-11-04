import Prompt from './Prompt'

export default function Game({ step, cleaners, messages, mode }) {
  return (
    <div id='game'>
      <div id='phone'>
        <div id='message-board'>{messages}</div>
      </div>
      <div id='control-board'>
        <Prompt prompt={step} cleanup={cleaners[step]} mode={mode} />
      </div>
    </div>
  )
}
