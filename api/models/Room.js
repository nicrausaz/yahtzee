import helpers from "../helpers"
import Player from "./Player"

class Room {
   constructor () {
      this.id = helpers.generateRandomId()
      this.players = []
   }

   registerPlayer (uuid, name) {
      this.players.push(new Player(uuid, name))
   }

   isFull () {
      return this.players.length === 4
   }
}

export default Room