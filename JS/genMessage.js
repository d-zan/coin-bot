const { to,from,coin } = require("../JSON/emo.json")
/**
 * @param {string} msg - The message
@example
 * // '[to]' => <:to:1319676859038040197> 
 * // '[from]' => <:from:1319676800300879925>
 * // '[coin]' => <:coin:1319676839756697620>
*/
function genMessage(msg) {
    let m = msg
   if (m.includes("[to]")) m = m.replace("[to]",to) 
   if (m.includes("[coin]"))m = m.replace("[coin]",coin) 
   if (m.includes("[from]"))m = m.replace("[from]",from) 
    return m;
}
module.exports = genMessage