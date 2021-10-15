import helpers from "../helpers"

class Player {
   constructor (socket, name) {
      this.socket = socket
      this.name = name
      this.ready = false
      this.abrev = helpers.generateAbrev(name)
   }

   isReady () {
      return this.ready
   }

   getSocket () {
      return this.socket
   }

   toggleReady () {
      this.ready = !this.ready
   }

   getClientData () {
      return {
         'name': this.name,
         'ready': this.ready,
         'abrev': this.abrev
      }
   }

   setName (name) {
      this.name = name
      this.abrev = helpers.generateAbrev(name)
   }
}

export default Player