import React, { useEffect } from 'react'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { NetworkType } from '@airgap/beacon-sdk'

// TODO: Move this state to the top of the app higherarchy -JS

const ConnectButton = ({
  Tezos,
  // setContract,
  setWallet,
  setUserAddress,
  // contractAddress,
  wallet,
}) => {
  const setup = async (userAddress) => {
    setUserAddress(userAddress)
    // creates contract instance
    // const contract = await Tezos.wallet.at(contractAddress)
    // setContract(contract)
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
  }, [])

  return (
    <button className="small-link" onClick={connectWallet}>
      <span>
        <i className="fas fa-wallet"></i>
        Connect with wallet
      </span>
    </button>
  )
}
export default ConnectButton
