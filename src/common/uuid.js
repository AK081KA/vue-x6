export function generateUUID() {
    let result = ''
    var d = new Date().getTime()
    result += d.toString()
    let rand = Math.random() * 100
    if (rand < 10) {
      result += '000' + rand.toString().substring(0, 1)
    } else if (rand < 100) {
      result += '00' + rand.toString().substring(0, 2)
    } else if (rand < 1000) {
      result += '0' + rand.toString().substring(0, 3)
    } else {
      result += rand.toString().substring(0, 4)
    }
    return result
  }
  