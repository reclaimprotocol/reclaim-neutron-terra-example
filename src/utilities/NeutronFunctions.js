import { useContext } from "react";
import { NeutronContext } from "./NeutronContext";
import { calculateFee, GasPrice } from "@cosmjs/stargate";

let contractAddress = "neutron1cqh6yx9jt2c6khkedc6cu2v6h8vv7apmtye56lg76flhture79jsxmrke5";

//Uncomment for mainnet
//let contractAddress = "neutron1c4rl2zws642m2nfkm7jl9ej0mc8emkhss5397ph7dh3sqggrldlsapylwe";
 
const NeutronFunctions = () => {
  const { neutronClient, neutronAddress } = useContext(NeutronContext);
 
  let verify_proof = async (proof) => {
    const defaultGasPrice = GasPrice.fromString("0.025untrn");
    const defaultExecuteFee = calculateFee(200_000, defaultGasPrice);

    console.log(proof);
    const result = await neutronClient.execute(
      neutronAddress, 
      contractAddress,
      {
        verify_proof: {
          proof: proof
        }
      },
      defaultExecuteFee
    );
    console.log(result);
  }

  return {
    verify_proof
  };
};
 
export { NeutronFunctions };
 