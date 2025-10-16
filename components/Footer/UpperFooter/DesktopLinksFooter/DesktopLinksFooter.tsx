import styles from "@/components/Footer/UpperFooter/UpperFooter.module.css";
type Props = {
    className?: string;
}
export default function DesktopLinksFooter({ className }: Readonly<Props>) {
  return (
    <div className={`${styles.border_footer} ${className} border-b border-[#e5e7eb66] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mt-8 pb-8`}>
        <div className={`${styles.footer_interlinks} text-start`}>
          <h4 className={`text-[#fff] block mb-3 break-words font-bold`}>Products</h4>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">HDFC Bank MyCards</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">HDFC Bank Co-LAB</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Quick Money - Top-Up on Car Loan</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Jaldi Five - Top-Up on Car Loan</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Credit Debit INR Prepaid Card System Upgrade</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Credit Card Tele Assist</a>
        </div>
        <div className={`${styles.footer_interlinks} text-start`}>
          <h4 className={`text-[#fff] block mb-3 break-words font-bold`}>Services</h4>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Aadhaar Seva Kendra</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">HDFC Life Cancer Care</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Buy Gift Cards</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Financial Literacy - English</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Financial Literacy - Hindi</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Fees & Charges</a>
        </div>
        <div className={`${styles.footer_interlinks} text-start`}>
          <h4 className={`text-[#fff] block mb-3 break-words font-bold`}>Tools & Calculators</h4>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Most Popular Calculators</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Loans</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Credit Cards</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Debit Cards</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Investments & insurance</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Deposits</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Accounts</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">SM E calculators</a>
        </div>
        <div className={`${styles.footer_interlinks} text-start`}>
          <h4 className={`text-[#fff] block mb-3 break-words font-bold`}>Contact Us</h4>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Customer Care</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">We Care For You</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Online Services</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Report Phishing site/email - report.phishingsite@hdfcbank.com</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Blocking Or Reporting Unauthorised (Those Not Done By You) Transactions</a>
        </div>
        <div className={`${styles.footer_interlinks} text-start`}>
          <h4 className={`text-[#fff] block mb-3 break-words font-bold`}>Other Information</h4>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Auction Notices</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Notice Board</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Bank Holidays</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">RBI Kehta Hai</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">{`Citizen's Charter`}</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Important Messages</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Our Corporate commitment</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">US Patriot Act Certificate</a>
          <a className={`text-[#fff] block mb-3 break-words`} href="http://" target="_blank" rel="noopener noreferrer">Use Of Unparliamentary Language By Customers</a>
        </div>
    </div>
  );
}