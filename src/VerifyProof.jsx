import { useState, useEffect } from "react";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import { NeutronFunctions } from "./utilities/NeutronFunctions";
 
export default function VerifyProof(props) {
  const [proof, setProof] = useState({});
  const [verified, setVerified] = useState(false);
  const { verify_proof } = NeutronFunctions();
 
  useEffect(() => {
    const newProof = Reclaim.transformForOnchain(props.proof);
    setProof(newProof);
  }, []);
 
  return (
    <div>
      <button
        className="button"
        onClick={async () => {
          try {
            console.log(proof);
            alert(proof);
            await verify_proof(proof);
          } catch (e) {
            console.error(e);
          } finally {
            setVerified(true);
          }
        }}
      >
        Verify Proof
      </button>
      {verified && <p> Proof verified </p>}
      <style jsx="true">{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .button {
          border: solid 1px #ccc;
          margin: 0 0 20px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}