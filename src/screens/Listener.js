import { useState, useEffect } from 'react'
import Message from '../components/Message'
import { LinearCrypter } from '../linear-crypt/index.mjs'
import BigNumber from 'bignumber.js'
import Game from '../components/Game'

function Listener() {
  const primP = BigNumber(309)
  const primN = 311
  const [a, seta] = useState(0)
  const [b, setb] = useState(0)
  const [privateChannel, setPrivateChannel] = useState(0)
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  function randomMessage(num) {
    var str = ''
    var chars = `qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789.?!-'"`
    for (var i = 0; i < num; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return str
  }

  const cleaners = [
    () => {
      let newArr = messages.slice(0)
      newArr.push(
        <Message
          message={`P = ${primP} N = ${primN}`}
          sender='Computer 1'
          mode={1}
          key={newArr.length}
        />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
    () => {
      let newA = Math.ceil(Math.random() * 997) + 3
      seta(newA)
      setb(Math.ceil(Math.random() * 997) + 3)
      let newArr = messages.slice(0)
      newArr.push(
        <Message
          message={`My public key is ${primP.pow(newA).mod(primN)}`}
          sender='Computer 1'
          mode={1}
          key={newArr.length}
        />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
    () => {
      setPrivateChannel(primP.pow(b).mod(primN).pow(a).mod(primN))
      let newArr = messages.slice(0)
      newArr.push(
        <Message
          message={`My public key is ${primP.pow(b).mod(primN)}`}
          sender='Computer 2'
          mode={1}
          key={newArr.length}
        />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
    () => {
      let newArr = messages.slice(0)
      newArr.push(
        <Message
          message={`We will be using a chunker of 5, and a salt of 100!`}
          sender='Computer 1'
          mode={1}
          key={newArr.length}
        />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
    () => {
      let newArr = messages.slice(0)
      let cryptr = new LinearCrypter(5, parseInt(privateChannel), 100)
      let msg = randomMessage(Math.floor(Math.random() * 15))
      setMessage(msg)
      newArr.push(
        <Message
          message={`Encrypted Message: \n[${cryptr
            .encrypt(msg)
            .matrix.map((arr) => `[${arr.join(',')}]`)
            .join('')}]`}
          sender='Computer 1'
          mode={1}
          key={newArr.length}
        />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
    () => {
      let newArr = messages.slice(0)
      let msg = document.getElementById('message-input').value
      let cryptr = new LinearCrypter(5, parseInt(privateChannel), 100)
      newArr.push(
        <Message
          message={`${
            message === msg
              ? 'Correct!'
              : `Incorrect. Actual Message: ${cryptr.decrypt(
                  cryptr.encrypt(message)
                )}`
          }`}
          sender='Computer'
          mode={0}
          key={newArr.length}
        />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
    () => {},
  ]

  useEffect(() => {
    var objDiv = document.getElementById('message-board')
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight
    }
  }, [step])

  return (
    <Game step={step} cleaners={cleaners} messages={messages} mode='listener' />
  )
}

export default Listener
