import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold tracking-tight mb-6">404</h1>
      <p className="text-xl mb-4">This page doesn't exist.</p>
      <Link to="/" className="link text-xl">
        Back home
      </Link>
    </div>
  );
};

export default NotFound;
