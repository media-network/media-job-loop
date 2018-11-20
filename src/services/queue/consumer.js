import Connection from './connection'

class Consumer extends Connection {
  constructor(props) {
    super(props)
  }

  onReceive(cb) {
    this.state.onConsume = cb

    return this
  }

  async connect() {
    await super.connect()

    if (!this.state.isReady) {
      return
    }

    const { channel } = this.state

    await channel.consume(this.state.queue, async (msg) => {
      console.log('RECEIVE')

      // await channel.ack(msg)
      await channel.reject(msg, false)
    }, {
      noAck: false
    })
  }
}

export const createConsumer = (options) => {
  return new Consumer(options)
}
