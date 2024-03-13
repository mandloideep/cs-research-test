import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  let location = useLocation();

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>
        No match for <code>{location.pathname}</code>
      </p>
      <button onClick={goHome}>Go Home</button>
    </div>
  );
};

export default ErrorPage;
