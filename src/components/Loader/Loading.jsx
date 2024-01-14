import { RiseLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <RiseLoader color="#0e17de" size={15} />
    </div>
  );
};

export default Loading;
