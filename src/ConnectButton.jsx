import { useContext } from "react";
import { NeutronContext } from "./utilities/NeutronContext";
 
export default function ConnectButton () {
    const { neutronAddress, connectWallet } = useContext(NeutronContext);
  
    return (
        <div>Neutron
        <div>
          <button className="button" onClick={connectWallet}>
            Connect Keplr
          </button>
        </div>
        <h2>
          {neutronAddress
            ? neutronAddress.slice(0, 10) + "...." + neutronAddress.slice(41, 45)
            : "Please connect wallet"}
        </h2>
      </div>
    )
}