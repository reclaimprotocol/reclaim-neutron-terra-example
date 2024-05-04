import { useContext } from "react";
import { NeutronContext } from "./NeutronContext";
import { LCDClient } from '@terra-money/terra.js';
import { calculateFee, GasPrice } from "@cosmjs/stargate";

const contractAddress = "neutron1zcytw9p07ytdskz4wk2txyqwlggpenly5d0adxsr4qlm6hfc2r8seqaezl";
const channel_id = "channel-4282";
const terra2Address = "terra13z58nvwxf5hjx0l7pwd72tt4dd2ycvj3zp3n5m5vtr3wnfw2jdzss35maw";
const terra2URL = "https://luna.nownodes.io/8e88b7de-791c-4ec1-9892-535929724e87";
const terra2ChainId = "phoenix-1";
 
const NeutronFunctions = () => {
  const { neutronClient, neutronAddress } = useContext(NeutronContext);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
 
  let verify_proof = async (proof) => {
    const defaultGasPrice = GasPrice.fromString("0.025untrn");
    const defaultExecuteFee = calculateFee(200_000, defaultGasPrice);

    console.log(proof);

    const terra = new LCDClient({
      URL: terra2URL, 
      chainID: terra2ChainId, 
    });

    const result = await neutronClient.execute(
      neutronAddress, 
      contractAddress,
      {
        verify_proof: {
          proof: {
            proof: proof
          },
          channel: channel_id
        }
      },
      defaultExecuteFee
    );
    console.log(result);
    
    // Wait till the packet from neutron arrives at terra
    // (This mechanism will be soon deprecated in the next version.)
    await sleep(5000);
    const queryResult = await terra.wasm.contractQuery(
      terra2Address,
      { query_result: { identifier: proof.signedClaim.claim.identifier} } // query msg
    );
    return queryResult.proof_result === 'Success';
  }

  return {
    verify_proof
  };
};
 
export { NeutronFunctions };
 
