// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '912958028797010', // your App ID
        'clientSecret'  : '46d438c2ad7802284553d9b21fe98e6a', // your App Secret
        'callbackURL'   : 'http://zachfalen.com/auth/facebook/callback'
    }

};