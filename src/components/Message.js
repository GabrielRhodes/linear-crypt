function Message({ sender, message, mode }) {
  let renderString = (
    <p>
      {message.split('\n').map((val) => (
        <p>
          {val}
          <br />
        </p>
      ))}
    </p>
  )
  return (
    <div
      className={`message ${mode === 0 ? 'secret' : 'aloud'} ${
        sender === 'You' ? 'sent' : 'read'
      }`}
    >
      <div>
        <b>{sender}:</b>
        {renderString}
      </div>
    </div>
  )
}

export default Message
