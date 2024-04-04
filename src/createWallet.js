const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir red
const network = bitcoin.networks.testnet
const path = `m/49'/1'/0'/0`

//creo el menemonic

let menemonic =bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(menemonic)

//creando la raiz de la cartera
let root = bip32.fromSeed(seed,network)

//creando la cuenta
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,

}).address

console.log("Cartera generada")
console.log("Address",btcAddress)
console.log("Privte Key", node.toWIF())
