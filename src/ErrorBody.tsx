interface ErrorProps {}

let ErrorBody = (props: ErrorProps) => {
  console.log("Props", props);
  return (
    <div className="element-position">
      {" "}
      There is no such GitHub User {props.userName}
    </div>
  );
};

export default ErrorBody;
