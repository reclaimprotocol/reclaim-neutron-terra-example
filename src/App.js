import "./App.css";
import { Reclaim } from "@reclaimprotocol/js-sdk";
 import { useState } from "react";
import QRCode from "react-qr-code";
import VerifyProof from "./VerifyProof";
import ConnectButton from "./ConnectButton";

function App() {
  const [url, setUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [proof, setProof] = useState({});


  const reclaimClient = new Reclaim.ProofRequest("0xC6527bdf890f704630AD168252dCB736907bE8f9"); //TODO: replace with your applicationId

  async function generateVerificationRequest() {
    const providerId = "1bba104c-f7e3-4b58-8b42-f8c0346cdeab"; //TODO: replace with your provider ids you had selected while creating the application

    reclaimClient.addContext(
      `user's address`,
      "for acmecorp.com on 1st january"
    );

    await reclaimClient.buildProofRequest(providerId);

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(
        "0x140ccf32fea02ecadcf5773162fcd1cc9acc74bd4c64e374393ed931297a40c8" //TODO : replace with your APP_SECRET
      )
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

    setUrl(requestUrl);

    await reclaimClient.startSession({
      onSuccessCallback: (proofs) => {
        console.log("Verification success", proofs);
        setReady(true);
        setProof(proofs[0]);
        // Your business logic here
      },
      onFailureCallback: (error) => {
        console.error("Verification failed", error);
        // Your business logic here to handle the error
      },
    });
  }

  return (
    <div className="App">
      <ConnectButton />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        {!url && (
          <button onClick={generateVerificationRequest}>
            Create Claim QrCode
          </button>
        )}
        {url && <QRCode value={url} />}
      </div>
      {ready && <VerifyProof proof={proof}></VerifyProof>}
    </div>
  );
}

export default App;