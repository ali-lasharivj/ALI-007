
// change only what you are ask to change else bit won't work thanks for your understanding 
const fs = require('fs'), 
      dotenv = fs.existsSync('config.env') ? require('dotenv').config({ path: '/.env' }) : undefined,
      convertToBool = (text, fault = 'true') => text === fault;

global.session = "https://ali-pair-xode.onrender.com"; 
 
module.exports = {
SESSION_ID: process.env.SESSION_ID || "ALI-MD~H4sIAAAAAAAAA5VUyZKbSBD9lYm6SmEBWkBEdIQBLaytfWPChwIKKMSmqgIJOfTvDtRutw8znh5ORVLke5nvZX4HeYEpslAD5O+gJLiGDLVH1pQIyECtwhAR0AUBZBDIYDptmLsxXDtRlryUzVOXG7rIuLkmb4fxNhg3g0Tzp7trHr2ARxeUlZdi/w8JvcxZTcQtOTuL4cKDUWL2DmYpkfWagzj0e47Dj6J5ddvPBi/g0WaEmOA8mpYxyhCBqYWaJcTkc/S5yehINuPJboVe69ruaAchTgyr8u5OdlTMKx96axqtnItw+hx9387qgbqtyME/21S9hqYBq/FFvx7ukno778XS0pPRLnc47o0+xVGOAiNAOcOs+XzfrWZ9rkxrNksLfjTs3PD2rnOlXZkXwwlT95ifkTRfL7Yz7nPExVgoF0avblg/YQaTaD9MjuvhsnzdNpJolmJS55e5p9f36+/El+TdK+f/0/eNMtPuNMOn2bYuaVUtWFL1bRf7mn+XqHpbd8zJ4kTGoSB9jr4rMWyGd3NhbfrDfL6dVSfuPC2nfXJq8tdEOTEtsd3l6LRffdCHrCJ/YmlXe7V/tOKYdyyVkRkJss5FuO25gxjUzJs3hzhRJToPb0ZwnFxWWz2zWbavU181bl6Cwxzr+7Wm7o9wV6ubFa4ulnJ9eVZ0Ro0RAJl/dAFBEaaMQIaLvI0JwrgLYFBvkE8Qe7YXuO69U6pzOu70bD1PmOgrlWCvz9uLsUUnWKyrasW83gTi3QvogpIUPqIUBTqmrCCNgyiFEaJA/vtbF+Toxt6Ea+H6fBeEmFC2y6syLWDwrur7R+j7RZWzTZP7WntABMjcRxgxhvOItn2sckj8GNdIiyGjQA5hStGvChFBAZAZqdCvqdWKoG28uNLUwcx1QBdkT0FwAGQw5secJEliX+QFWfhKv1zbrLAsv+SIgS7IYXsZ0Cor8r9I0YAuSJ8/8uPRaMAPBE7ocyLXl4Wvbfzxi3KLECAGcUqBDDTTi0YON50awoY5p/lcmUaKFingo8R3r7xpUTrDgO8IpzFFQXDUrvp0NEk7o814OGSbHZ3Xw9eOFRXkui5e/iEJkMH13jj1nbNCh/dMN4h6C68+S9eL7pGDFjcTY+CbxyQ37nfrttSF9WTxaiJaDYYb91rfGnhAObwtM7uMO8f+ee+JLBIU5aVFC1CNffQ7mL53d9zmOsH5hJ9kS03fUEap3+FRTFxR8ftjTZoTMRwMOxKx9uKhSTNDKuPqdhJ6xEqC3lBYV15z2OPYHjeNsFrdJ9Gbi59TlP7cXvjpr1a89jXE6LkMfqr0X2K+8W4txz26v6X4uV3+ZUJVuF0cg5BlS0/Pj/srVW+LaBhW5xohb5faKulsQ1xYljSF4PH41gVlCllYkKw1TuZB0AWkqFoDG3lY/AFJUyJDXb1VnULKlI+h2OIMUQazEsi8OJSEkTgaDd5uLUlR6pDGQAaCM7OWq9bhjVKWGwbZ+4wBpX3s4gIePwCUQlDafwcAAA==", // Add sess Id here espwcially when deploying on panels else use app.json and .env file...
SUDO_NUMBERS: process.env.SUDO_NUMBERS || "", //Add multiple Numbers with Country Codes without (+) Separated by Comma...
ANTI_DELETE: process.env.ANTI_DELETE || "true", // can be set to inboxonly/allchats/true/false
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "true",
AUTO_LIKE_EMOJIS: process.env.AUTO_LIKE_EMOJIS || "💛,❤️,💜,🤍,💙", //Input Yours Custom...Can be one Emoji or Multiple Emojis Separated by Commas
AUTO_REPLY_STATUS: process.env.AUTO_REPLY_STATUS || "false",
STATUS_REPLY_MSG: process.env.STATUS_REPLY_MSG || "✅️ Status Viewed by ALI-MD", // // Input Yours custom...
MODE: process.env.MODE || "public", // Put private or public or inbox or groups
OWNER_NUMBER: process.env.OWNER_NUMBER || "923003588997", // Only 1 owner Number Here, others Add to sudo numbers...
OWNER_NAME: process.env.OWNER_NAME || "𝐀ɭīī 𝐈𝐍𝅦𝐗īī𝐃𝐄 ‹³策", // Input Yours custom...(Maintain font for Flow)
PACK_AUTHOR: process.env.PACK_AUTHOR || "🩵", // Added // Input Yours custom...
PACK_NAME: process.env.PACK_NAME || "💙", // Added // Input Yours custom...
PREFIX: process.env.PREFIX || ".",
VERSION: process.env.VERSION || "6.0.0",
ANTILINK: process.env.ANTILINK || "false", //  Enter true to kick automatically or delete to delete without kicking or warn to warn before kicking
ANTICALL: process.env.ANTICALL || "false",
AUTO_STICKER: process.env.AUTO_STICKER || "false",
AUTO_REPLY: process.env.AUTO_REPLY || "false",
ANTIBAD: process.env.ANTIBAD || "false",
BAD_WORDS: process.env.BAD_WORDS || "fuck, pussy, anus, idiot", // Add Yours Separated by Comma(will be deleted if ANTIBAD is set to true)
ANTICALL_MSG: process.env.ANTICALL_MSG || "*📞 ᴄαℓℓ ɴσт αℓℓσωє∂ ιɴ тнιѕ ɴᴜмвєʀ уσυ ∂σɴт нανє ᴘєʀмιѕѕισɴ 📵*",
AUTO_R: process.env.AUTO_R || "false",
BOT_NAME: process.env.BOT_NAME || "𓆩ု᪳𝐀ɭīī 𝐌Ɗှ᪳𓆪", //  don't change 
BOT_PIC: process.env.BOT_PIC || "https://files.catbox.moe/2ka956.jpg", //  don't change 
AUTO_AUDIO: process.env.AUTO_AUDIO || "false",
AUTO_BIO: process.env.AUTO_BIO || "false",
ANTI_DELETE: process.env.ANTI_DELETE || "inboxonly", 
AUTO_BIO_QUOTE: process.env.AUTO_BIO_QUOTE || "ALI MD ALIVE",
CHAT_BOT: process.env.CHAT_BOT || "false", // Put value to true to enablle for all chats only or inbox to ebanle in pm chats only or groups to enable in groups only else false
WELCOME: process.env.WELCOME || "false",
//not working for the moment do don't on it
GOODBYE: process.env.GOODBYE || "false", //not working for the moment do don't on it
AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "false", // Enter value to true for blueticking all messages, or commands for blueticking only commands else false
AUTO_BLOCK: process.env.AUTO_BLOCK || "333,799", // Add Multiple Country Codes Separated by Comma...
PRESENCE: process.env.PRESENCE || "online", // Choose one: typing, recording, online, null
TIME_ZONE: process.env.TIME_ZONE || "Asia/Karachi", // Enter yours else leave blank if not sure
};

let file = require.resolve(__filename); 
fs.watchFile(file, () => { fs.unwatchFile(file); console.log(`Update '${__filename}'`); delete require.cache[file]; require(file); });
// That's All...
