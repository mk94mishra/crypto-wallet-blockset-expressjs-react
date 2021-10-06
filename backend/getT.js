
// build the Blockset API URL
const baseUrl = 'https://api.blockset.com'
const transactionsPath = 'transactions'
const transaction = 'bitcoin-mainnet:4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b'
const url = `${baseUrl}/${transactionsPath}/${transaction}`

const BLOCKSET_API_USER_JWT = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmQ6Y3QiOiJ1c3IiLCJicmQ6Y2xpIjoiNGQzMjRiYzMtYjk0OC00OGI3LWIxNmQtYTRlNjE0NWVkNzE2IiwiaWF0IjoxNjMyMTc0OTM2LCJleHAiOjE2NjM3MzI1MzYsInN1YiI6IjIxZTY2NDA1LTQzYmMtNDJlZC1iMmQ1LTQ2OTMwMDdhNGEyZCJ9.akqlZAKuUn6nwM1P7KCz7gP8JUEVWxZ_sclxEwgJRNSgJtyshd66dzUJhkop1awhqZ16t267E6DG_UXPAmAKGg'
// set the JWT bearer token, and specify JSON data type
const options = {
  json: true,
  headers: {
    authorization: `Bearer ${BLOCKSET_API_USER_JWT}`
  }
}

const axios = require('axios')

const response = async (url, options) => {
  
  const response = await axios.get(url, options)
  console.log(response)
  return { userToken: response.data.token, clientToken: response.data.client_token }

}

console.log(response(url, options))

const request = require('request')
// call blockset api
request(url, options, (error, blocksetResponse, blocksetBody) => {
    
  // if the network request failed, respond with an error
  if (error) {
    return error
  }

  // if the Blockset API request resulted in a non-200, respond with the error
  if (!blocksetResponse.ok) {
    return blocksetBody
  }

  // respond with the Blockset API response!
  console.log("ugkugkuf")
  return blocksetBody
})



  
  
