const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: true})
const port = process.env.PORT || 3004


io.on('connection', (socket) => {
  console.log(`有一个客户端连接了,socketId是${socket.id}`)
  // 当有客户端连接服务，把这个信息广播给所有客户端
  io.emit('message', {
    type: 'notice',
    value: `${socket.id}加入了群聊`
  })

  // 当有客户端断开连接，把这个信息广播给所有客户端
  socket.on('disconnect', (reason) => {
    io.emit('message', {
      type: 'notice',
      value: `${socket.id}退出了群聊`
    })
  })

  // 当有客户端发来消息，把这个消息广播给所有客户端
  socket.on('message', info => {
    console.log('info', info)
    // io.sockets.emit('message', info)
    // io.sockets.send(info)
    io.emit('message', info)
  })
})


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})