export default {
   generateRandomId () {
      return Math.random().toString(36).substr(2, 8)
   },

   getArgsFromBuffer (buffer) {
      return String.fromCharCode.apply(null, buffer).split(' ')
   },

   generateAbrev (name) {
      return name.substr(0, 2).toUpperCase()
   }
}