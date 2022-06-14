// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC14dc7e1f809ad4070f4ed5ae437a0469'
const authToken = '08139b7dcba584825ba30cbf347071f2'
const client = require('twilio')(accountSid, authToken)

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+19362377600',
    to: '+447529147911'
  })
  .then((message) => console.log(message.sid))
