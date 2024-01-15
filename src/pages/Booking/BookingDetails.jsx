import { useParams } from "react-router-dom";

const BookingDetails = () => {
  const { id } = useParams();

  console.log(id);

  return <div>BookingDetails </div>;
};

export default BookingDetails;
