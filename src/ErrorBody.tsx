interface ErrorProps {
  userName: Text;
}

let ErrorBody = (props: ErrorProps) => {
  return (
    <div className="element-position">
      {" "}
      There is no such GitHub User {props.userName}
    </div>
  );
};

export default ErrorBody;
