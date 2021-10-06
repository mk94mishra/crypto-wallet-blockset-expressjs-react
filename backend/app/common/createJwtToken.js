const axios = require('axios')
const bitcore = require('bitcore-lib')
const Mnemonic = require('bitcore-mnemonic')
const jsonwebtoken = require('jsonwebtoken')
const KeyEncoder = require('key-encoder').default
const keyEncoder = new KeyEncoder('secp256k1')
const { v4: uuidv4 } = require('uuid')

const getAccountJwt = async (email, password) => {
  const body = { email, password }
  const response = await axios.post('https://api.blockset.com/accounts/login', body)
  return response.data.token
}

const getClientJwt = async (accountJwt) => {
  const headers = { authorization: `Bearer ${accountJwt}` }
  const body = {}
  const response = await axios.post('https://api.blockset.com/clients', body, { headers })
  return response.data.token
}

// create bitcoin wallet
const makeKeypair = (mnemonic) => {
  const code = new Mnemonic(mnemonic)
  const xpriv = new bitcore.HDPrivateKey(code.toHDPrivateKey().toString())
  const keypair = xpriv.deriveChild("m/1'/0")
  console.log(keypair.privateKey)
  return { privateKey: keypair.privateKey, publicKey: keypair.publicKey }
}

const signUserTokenRequest = (clientJwt, privateKey, publicKey) => {
  const clientJwtHash = bitcore.crypto.Hash.sha256(Buffer.from(clientJwt, 'utf-8'))
  const clientJwtSignature = bitcore.crypto.ECDSA.sign(clientJwtHash, privateKey)
  
  return {
    signature: clientJwtSignature.toDER().toString('base64'),
    publicKey: publicKey.toDER().toString('base64'),
    deviceId: uuidv4()
  }
}

const getUserTokenRequest = async (signature, publicKey, deviceId, clientJwt) => {
  const headers = { authorization: `Bearer ${clientJwt}` }
  const body = { signature, pub_key: publicKey, device_id: deviceId }
  const response = await axios.post('https://api.blockset.com/users/token', body, { headers })
  return { userToken: response.data.token, clientToken: response.data.client_token }
}

const makeUserJwt = (userToken, clientToken, privateKey) => {
  const body = { 'brd:ct': 'usr', 'brd:cli': clientToken }
  const pemPrivateKey = keyEncoder.encodePrivate(privateKey.toString(), 'raw', 'pem')
  const options = { algorithm: 'ES256', subject: userToken, expiresIn: '1y' }
  const response = jsonwebtoken.sign(body, pemPrivateKey, options)
  return response
}

const makeTokens = async (mnemonic) => {
  const accountJwt = await getAccountJwt('mkmanish1994mishra@gmail.com', 'Manish9430197123')
  const clientJwt = await getClientJwt(accountJwt)
  const keypair = await makeKeypair(mnemonic)
  const signedRequest = signUserTokenRequest(clientJwt, keypair.privateKey, keypair.publicKey)
  const userJwtRequest = await getUserTokenRequest(signedRequest.signature, signedRequest.publicKey, signedRequest.deviceId, clientJwt)
  const userJwt = makeUserJwt(userJwtRequest.userToken, userJwtRequest.clientToken, keypair.privateKey)
  return ({userJwt, keypair})
  //return ({ accountJwt, clientJwt, userJwt })
}


var err = ''
var txHash = ''
const createJwtToken = async (mnemonic) => {
   console.log(makeTokens(mnemonic))
   return await makeTokens(mnemonic)    
}

module.exports = { createJwtToken, makeTokens};
