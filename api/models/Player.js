class Player {
   constructor (uuid, socket, name) {
      this.connUuid = uuid
      this.socket = socket
      this.name = name
   }
}

export default Player