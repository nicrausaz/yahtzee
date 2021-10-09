export default {
   generateRandomId () {
      return Math.random().toString(36).substr(2, 8)
   },

   getStringFromBuffer (buffer) {
      return String.fromCharCode.apply(null, buffer)
   }
}