const io = require("socket.io")(3000)

import helpers from './helpers'

io.on("connection", socket => {
   // either with send()
   socket.send("Hello!")

   socket.send(helpers.generateRoomName())

   // handle the event sent with socket.send()
   socket.on("message", (data) => {
      console.log(data)
   })

   // handle the event sent with socket.emit()
   socket.on("salutations", (elem1, elem2, elem3) => {
      console.log(elem1, elem2, elem3)
   })
})
