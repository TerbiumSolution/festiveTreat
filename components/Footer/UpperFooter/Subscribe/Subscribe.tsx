import { SelectSubscribe } from "./SelectSubscribe";
import styles from "@/components/Footer/UpperFooter/Subscribe/Subscribe.module.css";
export default function Subscribe() {
  return (
    <section className={`${styles.subscribe_wrapper} py-8 flex justify-between`}>
        <div className={`${styles.select_wrapper} flex gap-8`}>
            <SelectSubscribe text={`HDFC Group Website`}/>
            <SelectSubscribe text={`HDFC Bank Offshore Branches`}/>
        </div>
    </section>
  );
}