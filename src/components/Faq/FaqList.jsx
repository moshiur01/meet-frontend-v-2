import { faqs } from "../../assets/data/faqs";
import FaqItem from "./FaqItem";

const FaqList = () => {
  //   console.log(faqs);
  return (
    <ul className="mb-[48px]">
      {faqs.map((item, index) => (
        <FaqItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default FaqList;
