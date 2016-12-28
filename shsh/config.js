'use strict'

const config = {
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY
  },
  client: {
    endpoints: {
      pictures: 'http://api.shotandshare.com/picture',
      users: 'http://api.shotandshare.com/user',
      auth: 'http://api.shotandshare.com/auth'
    }
  },
  auth: {
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://shotandshare.com/auth/facebook/callback'
    }
  },
  secret: process.env.SHSH_SECRET || 'shshcl4v3'
}
// For development use local micro instances
if (process.env.NODE_ENV !== 'production') {
  config.client.endpoints = {
    pictures: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002'
  }
  
  config.auth.facebook.callbackURL = 'http://shotandshare.test:5050/auth/facebook/callback'
}

module.exports = config

// a tener en cuenta, cada vez que inicio el proyecto
// debo asociar el fichero env.sh en la terminal => source env.sh
// sino no se podra establecer la comunicacion con S3 de Aws ni subir 
// las fotos
