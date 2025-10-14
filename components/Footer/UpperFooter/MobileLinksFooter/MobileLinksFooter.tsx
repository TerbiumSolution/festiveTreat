import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import styles from "@/components/Footer/UpperFooter/MobileLinksFooter/MobileLinksFooter.module.css";
type Props = {
    className?: string;
}
export function MobileLinksFooter({ className }: Readonly<Props>) {
  return (
    <>
        <Accordion type="single" collapsible className={`${className} w-full pt-10 pb-4`} defaultValue="item-1" >
        <AccordionItem value="item-1" className="!border-[#374151]">
            <AccordionTrigger className={`px-3 ${styles.accordion_wrapper} py-2`}>Product Information</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-left py-4">
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">HDFC Bank MyCards</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">HDFC Bank Co-LAB</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Quick Money - Top-Up on Car Loan</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Jaldi Five - Top-Up on Car Loan</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Credit Debit INR Prepaid Card System Upgrade</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Credit Card Tele Assist</a>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="!border-[#374151]">
            <AccordionTrigger className={`px-3 ${styles.accordion_wrapper} py-2`}>Shipping Details</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-left py-4">
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">HDFC Bank MyCards</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">HDFC Bank Co-LAB</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Quick Money - Top-Up on Car Loan</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Jaldi Five - Top-Up on Car Loan</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Credit Debit INR Prepaid Card System Upgrade</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Credit Card Tele Assist</a>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="!border-[#374151]">
            <AccordionTrigger className={`px-3 ${styles.accordion_wrapper} py-2`}>Return Policy</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-left py-4">
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">HDFC Bank MyCards</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">HDFC Bank Co-LAB</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Quick Money - Top-Up on Car Loan</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Jaldi Five - Top-Up on Car Loan</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Credit Debit INR Prepaid Card System Upgrade</a>
            <a className={`text-[#fff] block mb-3 break-words ${styles.link_wrapper} px-3`} href="http://" target="_blank" rel="noopener noreferrer">Credit Card Tele Assist</a>
            </AccordionContent>
        </AccordionItem>
        </Accordion>
    </>
  )
}
