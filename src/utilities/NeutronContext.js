import { createContext, useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

 const NeutronContext = createContext(null);
const NEUTRON_CHAIN_ID = "pion-1";
const NEUTRON_LCD = "https://rpc-palvus.pion-1.ntrn.tech/";

//Uncomment for Mainnet
// const NEUTRON_CHAIN_ID = "neutron-1";
// const NEUTRON_LCD = "https://rpc-kralum.neutron-1.neutron.org";
 
const NeutronContextProvider = ({ children }) => {
  const [neutronClient, setNeutronClient] = useState(null);
  const [neutronAddress, setNeutronAddress] = useState("");
 
  async function setupKeplr(setNeutronClient, setNeutronAddress) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
 
    while (
      !window.keplr ||
      !window.getEnigmaUtils ||
      !window.getOfflineSignerOnlyAmino
    ) {
      await sleep(50);
    }
 
    await window.keplr.enable(NEUTRON_CHAIN_ID);
    window.keplr.defaultOptions = {
      sign: {
        preferNoSetFee: false,
        disableBalanceCheck: true,
      },
    };
 
    const keplrOfflineSigner =
      window.getOfflineSignerOnlyAmino(NEUTRON_CHAIN_ID);
    const accounts = await keplrOfflineSigner.getAccounts();
 
    console.log(accounts[0].address);
    const neutronAddress = accounts[0].address;
 
    const neutronClient = await SigningCosmWasmClient.connectWithSigner(NEUTRON_LCD, keplrOfflineSigner);
 
    setNeutronAddress(neutronAddress);
    setNeutronClient(neutronClient);
  }
 
  async function connectWallet() {
    try {
      if (!window.keplr) {
        console.log("intall keplr!");
      } else {
        await setupKeplr(setNeutronClient, setNeutronAddress);
        localStorage.setItem("keplrAutoConnect", "true");
        console.log(neutronAddress);
      }
    } catch (error) {
      alert(
        "An error occurred while connecting to the wallet. Please try again."
      );
    }
  }
 
  function disconnectWallet() {
    // reset neutronClient and neutronAddress
    setNeutronAddress("");
    setNeutronClient(null);
 
    // disable auto connect
    localStorage.setItem("keplrAutoConnect", "false");
 
    // console.log for success
    console.log("Wallet disconnected!");
  }

  async function addNeutronToKeplr () {
        try {
          if (!window.keplr) {
            alert("Intall keplr!");
          } else {
            //Uncomment for Mainnet
            /*
            const chainConfig = {
              "rpc": "https://rpc-neutron.keplr.app",
              "rest": "https://lcd-neutron.keplr.app",
              "chainId": "neutron-1",
              "chainName": "Neutron",
              "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/neutron/chain.png",
              "bip44": {
                "coinType": 118
              },
              "bech32Config": {
                "bech32PrefixAccAddr": "neutron",
                "bech32PrefixAccPub": "neutronpub",
                "bech32PrefixValAddr": "neutronvaloper",
                "bech32PrefixValPub": "neutronvaloperpub",
                "bech32PrefixConsAddr": "neutronvalcons",
                "bech32PrefixConsPub": "neutronvalconspub"
              },
              "currencies": [
                {
                  "coinDenom": "NTRN",
                  "coinMinimalDenom": "untrn",
                  "coinDecimals": 6,
                  "coinGeckoId": "neutron-3",
                  "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/neutron/untrn.png"
                }
              ],
              "feeCurrencies": [
                {
                  "coinDenom": "NTRN",
                  "coinMinimalDenom": "untrn",
                  "coinDecimals": 6,
                  "coinGeckoId": "neutron-3",
                  "gasPriceStep": {
                    "low": 0.0053,
                    "average": 0.0053,
                    "high": 0.0053
                  }
                }
              ],
              "features": ["cosmwasm"]
            }
            */
            const chainConfig = {
              "rpc": "https://rpc-palvus.pion-1.ntrn.tech",
              "rest": "https://rest-palvus.pion-1.ntrn.tech",
              "chainId": "pion-1",
              "chainName": "Neutron Testnet",
              "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/neutron/chain.png",
              "bip44": {
                "coinType": 118
              },
              "bech32Config": {
                "bech32PrefixAccAddr": "neutron",
                "bech32PrefixAccPub": "neutronpub",
                "bech32PrefixValAddr": "neutronvaloper",
                "bech32PrefixValPub": "neutronvaloperpub",
                "bech32PrefixConsAddr": "neutronvalcons",
                "bech32PrefixConsPub": "neutronvalconspub"
              },
              "currencies": [
                {
                  "coinDenom": "NTRN",
                  "coinMinimalDenom": "untrn",
                  "coinDecimals": 6
                }
              ],
              "feeCurrencies": [
                {
                  "coinDenom": "NTRN",
                  "coinMinimalDenom": "untrn",
                  "coinDecimals": 6,
                  "gasPriceStep": {
                    "low": 0.02,
                    "average": 0.02,
                    "high": 0.02
                  }
                }
              ],
              "features": []
            }
          await window.keplr.experimentalSuggestChain(chainConfig);
      }
    } catch (error) {
      alert(
        "An error occurred while connecting to the wallet. Please try again."
      );
    }
  }

  return (
    <NeutronContext.Provider
      value={{
        neutronClient,
        setNeutronClient,
        neutronAddress,
        setNeutronAddress,
        connectWallet,
        disconnectWallet,
        addNeutronToKeplr
      }}
    >
      {children}
    </NeutronContext.Provider>
  );
};

export { NeutronContext, NeutronContextProvider };