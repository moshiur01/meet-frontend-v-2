/* eslint-disable react/prop-types */

const ActionBar = ({ title, children }) => {
  return (
    <div>
      <h1 className="font-[600] text-2xl">{title}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0px",
          fontSize: "30px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
