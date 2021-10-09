import helpers from "../helpers"

class Room {
   constructor () {
      this.id = helpers.generateRoomName()
      this.players = []
   }

   canJoin() {
      return this.players.length < 4
   }
}

export default Room