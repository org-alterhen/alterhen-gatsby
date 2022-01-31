import React, { useEffect } from 'react'
import { BeaconWallet } from '@taquito/beacon-wallet'
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
} from '@airgap/beacon-sdk'

const ConnectButton = ({
  Tezos,
  setContract,
  setWallet,
  setUserAddress,
  contractAddress,
  wallet,
}) => {
  const setup = async (userAddress) => {
    setUserAddress(userAddress)
    // creates contract instance
    const contract = await Tezos.wallet.at(contractAddress)
    setContract(contract)
  }
  const connectWallet = async () => {
    try {
      await wallet.requestPermissions({
        network: {
          type: NetworkType.MAINNET,
          rpcUrl: 'https://api.tez.ie/rpc/mainnet',
        },
      })
      // gets user's address
      const userAddress = await wallet.getPKH()
      await setup(userAddress)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      // creates a wallet instance
      const wallet = new BeaconWallet({
        name: 'a\\terHEN Gallery',
        preferredNetwork: NetworkType.MAINNET,
        disableDefaultEvents: true,
        eventHandlers: {
          // To keep the pairing alert, we have to add the following default event handlers back
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT,
          },
        },
      })
      Tezos.setWalletProvider(wallet)
      setWallet(wallet)
      // checks if wallet was connected before
      const activeAccount = await wallet.client.getActiveAccount()
      if (activeAccount) {
        const userAddress = await wallet.getPKH()
        await setup(userAddress)
        if (typeof window !== 'undefined')
          localStorage.setItem('lastUserAddress', userAddress)
      }
    })()
  })
  return React.createElement(
    'div',
    { className: 'buttons wallet-buttons' },
    React.createElement(
      'button',
      { className: '', onClick: connectWallet },
      React.createElement(
        'span',
        null,
        React.createElement('i', { className: 'fas fa-wallet' }),
        'Connect with wallet'
      )
    )
  )
}
export default ConnectButton
