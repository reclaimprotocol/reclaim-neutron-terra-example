import { useContext } from "react";
import { NeutronContext } from "./NeutronContext";
import { calculateFee, GasPrice } from "@cosmjs/stargate";

let contractAddress = "neutron1cqh6yx9jt2c6khkedc6cu2v6h8vv7apmtye56lg76flhture79jsxmrke5";
 
const NeutronFunctions = () => {
  const { neutronClient, neutronAddress } = useContext(NeutronContext);
 
  let verify_proof = async (proof) => {
/*
    // Mock Data for testing!
    const owner = "0xe4c20c9f558160ec08106de300326f7e9c73fb7f"

    const claimInfo = {
        "provider": "http",
        "parameters": "{\"body\":\"\",\"geoLocation\":\"in\",\"method\":\"GET\",\"responseMatches\":[{\"type\":\"contains\",\"value\":\"_steamid\\\">Steam ID: 76561199632643233</div>\"}],\"responseRedactions\":[{\"jsonPath\":\"\",\"regex\":\"_steamid\\\">Steam ID: (.*)</div>\",\"xPath\":\"id(\\\"responsive_page_template_content\\\")/div[@class=\\\"page_header_ctn\\\"]/div[@class=\\\"page_content\\\"]/div[@class=\\\"youraccount_steamid\\\"]\"}],\"url\":\"https://store.steampowered.com/account/\"}",
        "context": "{\"contextAddress\":\"user's address\",\"contextMessage\":\"for acmecorp.com on 1st january\"}",
    }

    const identifier = "0x531322a6c34e5a71296a5ee07af13f0c27b5b1e50616f816374aff6064daaf55"

    const signedClaim = {
        "claim": {
            "identifier": identifier,
            "owner": owner,
            "epoch": 1,
            "timestampS": 1710157447
        },
        "signatures": ["0x52e2a591f51351c1883559f8b6c6264b9cb5984d0b7ccc805078571242166b357994460a1bf8f9903c4130f67d358d7d6e9a52df9a38c51db6a10574b946884c1b1"],
    }


    proof = {
        claimInfo: claimInfo,
        signedClaim: signedClaim
    }
    */
    // let tx = await secretjs.tx.compute.executeContract(
    //   {
    //     sender: neutronAddress,
    //     contract_address: contractAddress,
    //     msg: {
    //       verify_proof: {
    //         proof: proof
    //       }
    //     },
    //     code_hash: contractCodeHash,
    //   },
    //   { gasLimit: 100_000 }
    // );
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
 