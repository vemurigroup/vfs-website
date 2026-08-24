import React from 'react';

export default function Kyc() {
  return (
    <section id="kyc" className="section">
      <div className="container">

         <div className="section-title">
            <h2>KYC Services</h2>
            <p>Complete your KYC seamlessly before investing in Mutual Funds and other financial products.</p>
         </div>

         <div className="kyc-grid">


            {/*  KYC Entry  */}
            <div className="kyc-card">
               <div className="kyc-icon">📝</div>
               <h3>KYC Entry</h3>
               <p>
                  Submit your KYC details and upload the required documents.
               </p>

               <a href="https://www.cvlkra.com/" target="_blank" className="btn-primary">
                  KYC Entry
               </a>
            </div>

            {/*  KYC Validation  */}
            <div className="kyc-card">
               <div className="kyc-icon">✅</div>
               <h3>KYC Validation</h3>
               <p>
                  Verify your PAN and check whether your KYC is valid.
               </p>

               <a href="https://validate.cvlindia.com/CVLKRAVerification_V1/" target="_blank" className="btn-primary">
                  Validate KYC
               </a>
            </div>


            {/*  Do KYC  */}
            <div className="kyc-card">
               <div className="kyc-icon">🆕</div>
               <h3>Do KYC</h3>
               <p>
                  Complete your Online KYC for first-time investments.
               </p>

               <a href="https://www.dspim.com/invest/#goto=kyc" target="_blank" className="btn-primary">
                  Do KYC
               </a>
            </div>

         </div>

         {/*  Awareness Box  */}
         <div className="kyc-awareness">

            <h3>🔒 Why is KYC Important?</h3>

            <ul>
               <li>Mandatory for investing in Mutual Funds.</li>
               <li>Required as per SEBI regulations.</li>
               <li>Protects against identity fraud.</li>
               <li>Enables smooth purchases, SIPs and redemptions.</li>
               <li>One-time process with easy updates whenever required.</li>
               <li>Valid KYC helps avoid transaction rejections.</li>
            </ul>

            <div className="kyc-note">
               <strong>Note:</strong>
               Investors without a valid KYC may not be able to invest or transact in Mutual Funds until their KYC is
               completed and verified.
            </div>

            <div className="kyc-contact">
               Need help completing your KYC?<br />
               📞 <strong>9886291668</strong><br />
               <strong>Vemuri Financial Services</strong>
            </div>

         </div>

      </div>
   </section>
  );
}