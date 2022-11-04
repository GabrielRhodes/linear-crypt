import { useState, useEffect } from 'react'
import Message from '../components/Message'
import { LinearCrypter } from '../linear-crypt/index.mjs'
import BigNumber from 'bignumber.js'
import Game from '../components/Game'

function Reader() {
  const primP = BigNumber(309)
  const primN = 311
  const [a, seta] = useState(0)
  const [b, setb] = useState(0)
  const [privateChannel, setPrivateChannel] = useState(0)
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState([])

  const cleaners = [
    () => {
      let msg = document.getElementById('channel-number')?.value
      seta(parseInt(msg))
      setb(Math.ceil(Math.random() * 997) + 3)
      let newArr = messages.slice(0)
      newArr.push(
        <Message
          message={`Secret Key: ${msg}`}
          sender='You'
          mode={0}
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
          message={`My public key is ${primP.pow(b).mod(primN)}`}
          sender='Computer'
          mode={1}
          key={newArr.length}
        />
      )
      newArr.push(
        <Message
          message={`My public key is ${primP.pow(a).mod(primN)}`}
          sender='You'
          mode={1}
          key={newArr.length}
        />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
    () => {
      let newArr = messages.slice(0)
      setPrivateChannel(primP.pow(b).mod(primN).pow(a).mod(primN))
      newArr.push(
        <Message
          message={`That means our private key must be ${primP
            .pow(b)
            .mod(primN)} ^ ${a} % ${primN} which is ${primP
            .pow(b)
            .mod(primN)
            .pow(a)
            .mod(primN)}`}
          sender='You'
          mode={0}
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
          sender='Computer'
          mode={1}
          key={newArr.length}
        />
      )
      newArr.push(
        <Message message={`Okay!`} sender='You' mode={1} key={newArr.length} />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
    (msg = 'Hello World!') => {
      let newArr = messages.slice(0)
      let cryptr = new LinearCrypter(5, parseInt(privateChannel), 100)
      newArr.push(
        <Message
          message={`Encrypted Message: \n[${cryptr
            .encrypt(msg)
            .matrix.map((arr) => `[${arr.join(',')}]`)
            .join('')}]`}
          sender='Computer'
          mode={1}
          key={newArr.length}
        />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
    (msg = 'Hello World!') => {
      let newArr = messages.slice(0)
      let cryptr = new LinearCrypter(5, parseInt(privateChannel), 100)
      newArr.push(
        <Message
          message={`Decrypted Message: \n[${cryptr
            .matrixMultiply(cryptr.encryptMatrix(), cryptr.encrypt(msg))
            .round()
            .matrix.map((arr) => `[${arr.join(',')}]`)
            .join('')}]`}
          sender='You'
          mode={0}
          key={newArr.length}
        />
      )
      newArr.push(
        <Message
          message={`Message: ${cryptr.decrypt(cryptr.encrypt(msg))}`}
          sender='You'
          mode={0}
          key={newArr.length}
        />
      )
      setMessages(newArr)
      setStep(step + 1)
    },
  ]

  useEffect(() => {
    var objDiv = document.getElementById('message-board')
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight
    }
  }, [step])

  return (
    <Game step={step} cleaners={cleaners} messages={messages} mode='reader' />
  )
}

export default Reader
