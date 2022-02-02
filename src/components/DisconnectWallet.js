import React from 'react'
import { TezosToolkit } from '@taquito/taquito'

const DisconnectButton = ({ wallet, setUserAddress, setWallet, setTezos }) => {
  const disconnectWallet = async () => {
    setUserAddress('')
    setWallet(null)
    const tezosTK = new TezosToolkit('https://api.tez.ie/rpc/mainnet')
    setTezos(tezosTK)
    if (wallet) {
      await wallet.client.removeAllAccounts()
      await wallet.client.removeAllPeers()
      await wallet.client.destroy()
    }
  }

  return (
    <div className="buttons wallet-buttons">
      <button onClick={disconnectWallet}>
        <i className="fas fa-times"></i>Disconnect wallet
      </button>
    </div>
  )
}

export default DisconnectButton
