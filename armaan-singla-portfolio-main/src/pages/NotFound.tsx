import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const NotFound = () => {
  return (
    <div>
      <Seo
        title="Page Not Found | Armaan Singla"
        description="This page doesn't exist."
        path="/404"
        noindex
      />
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 sm:mb-6">404</h1>
      <p className="text-base sm:text-lg mb-4">This page doesn't exist.</p>
      <Link to="/" className="link text-base sm:text-lg">
        Back home
      </Link>
    </div>
  );
};

export default NotFound;
