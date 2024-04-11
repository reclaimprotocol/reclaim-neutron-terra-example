import { createContext, useState } from "react";
 
const NeutronContext = createContext(null);
const NEUTRON_CHAIN_ID = "pion-1";
const NEUTRON_LCD = "https://rpc-palvus.pion-1.ntrn.tech/";
 
const NeutronContextProvider = ({ children }) => {
  const [neutronjs, setNeutronJS] = useState(null);
  const [neutronAddress, setNeutronAddress] = useState("");
 
  async function setupKeplr(setNeutronJS, setNeutronAddress) {
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
 
    // const neutronjs = new SecretNetworkClient({
    //   url: NEUTRON_LCD,
    //   chainId: NEUTRON_CHAIN_ID,
    //   wallet: keplrOfflineSigner,
    //   walletAddress: neutronAddress,
    //   encryptionUtils: window.getEnigmaUtils(NEUTRON_CHAIN_ID),
    // });

    const neutronjs = "";
 
    setNeutronAddress(neutronAddress);
    setNeutronJS(neutronjs);
  }
 
  async function connectWallet() {
    try {
      if (!window.keplr) {
        console.log("intall keplr!");
      } else {
        await setupKeplr(setNeutronJS, setNeutronAddress);
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
    // reset neutronjs and neutronAddress
    setNeutronAddress("");
    setNeutronJS(null);
 
    // disable auto connect
    localStorage.setItem("keplrAutoConnect", "false");
 
    // console.log for success
    console.log("Wallet disconnected!");
  }
 
  return (
    <NeutronContext.Provider
      value={{
        neutronjs,
        setNeutronJS,
        neutronAddress,
        setNeutronAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </NeutronContext.Provider>
  );
};
 
export { NeutronContext, NeutronContextProvider };
 