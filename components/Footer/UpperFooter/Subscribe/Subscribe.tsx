import { SelectSubscribe } from "./SelectSubscribe";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
import styles from "@/components/Footer/UpperFooter/Subscribe/Subscribe.module.css";
export default function Subscribe() {
  return (
    <section className={`${styles.subscribe_wrapper} py-8 flex justify-between`}>
        <div className={`${styles.select_wrapper} flex gap-8`}>
            <SelectSubscribe text={`HDFC Group Website`}/>
            <SelectSubscribe text={`HDFC Bank Offshore Branches`}/>
        </div>
        {/* <div className={`${styles.email_address}`}>
            <div className={`flex w-full max-w-sm items-center space-x-2 ${styles.email_address_inset}`}>
                <div className={`${styles.subscriber_wrapper} relative w-full mx-0`}>
                <Label htmlFor="subscribe-email" className="sr-only">
                    Email
                </Label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
                        <path d="M19.5 13C19.5 13.3978 19.3419 13.7792 19.0605 14.0605C18.7792 14.3419 18.3978 14.5 18 14.5H2C1.60218 14.5 1.22076 14.3419 0.939453 14.0605C0.658149 13.7792 0.5 13.3978 0.5 13V3.57031L8.47363 10.3955L8.48633 10.4062L8.49902 10.416C8.92718 10.7377 9.44884 10.9112 9.98438 10.9102H9.98535C10.5524 10.907 11.1033 10.7185 11.5537 10.374L11.5645 10.3662L11.5752 10.3564L19.5 3.57031V13ZM17.998 0.5L18.1279 0.506836C18.2215 0.515547 18.3137 0.532641 18.4033 0.558594L10 7.75488L1.5957 0.558594C1.68557 0.532497 1.77817 0.515577 1.87207 0.506836L2.00195 0.5H17.998Z" fill="#535353" stroke="#535353"/>
                    </svg>
                </div>
                    <Input type="email" id="subscribe-email" placeholder="Enter your email" className={`${styles.input_wrapper} pl-10 placeholder-white text-white bg-white`} />
                </div>
                <Button className={`${styles.button_wrapper}`} type="submit">Subscribe</Button>
            </div>
        </div> */}
    </section>
  );
}