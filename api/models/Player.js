import helpers from "../helpers"

class Player {
   constructor (name) {
      this.id = helpers.generateRandomId()
      this.name = name
   }
}

export default Player