import { Link } from "react-router-dom";
import { essays } from "@/data/essays";

const Writing = () => {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10">
        Writing
      </h1>

      <div className="space-y-7">
        {essays.map((essay) => (
          <div key={essay.slug}>
            <h2 className="text-2xl">
              <Link to={`/writing/${essay.slug}`} className="link font-bold">
                {essay.title}
              </Link>
            </h2>
            <p className="mt-1 text-xl leading-relaxed text-foreground/90">
              {essay.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Writing;
