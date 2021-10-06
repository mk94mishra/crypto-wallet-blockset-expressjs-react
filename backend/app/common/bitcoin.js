
const bitcore = require('bitcore-lib')
const Insight = require('bitcore-insight').Insight

let insight = new Insight('testnet')

// your private key and address
const privateKey = 'Your Private Key'
const myAddress = privateKey.toAddress()

// Address we are sending Bitcoin to
const addressTo = 'Receiver address'

// Start the creating our transaction
const amount = 50000 // Sending amount must be in satoshis
const fee = 50000 // Fee is in satoshis


// Get the UTXOs of your Bitcoin address
insight.getUtxos(myAddress, (err, utxos) => {
        if(err){ 
          //Handle errors
          return err
        }else { 
            // use the UTXOs to create transaction with bitcore Transaction object
            let tx = bitcore.Transaction()
            tx.from(utxos)
            tx.to(addressTo, amount)
            tx.change(myAddress)
            tx.fee(fee)
            tx.sign(privateKey)
            tx.serialize()
            
            // Broadcast your transaction to the Bitcoin network
            insight.broadcast(tx.toString(), (error, txid) => {
                if (error) {
                    return error;
                } else {
                  // Your Transaction Id
                    console.log(txid)
                }
            })
        }
    })
