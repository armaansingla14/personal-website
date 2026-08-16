import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/projects", label: "Projects" },
  { to: "/writing", label: "Writing" },
  { to: "/art", label: "Art" },
];

const Nav = () => {
  return (
    <nav className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 mb-14 text-xl">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.to === "/"}
          className={({ isActive }) =>
            isActive
              ? "font-bold text-foreground"
              : "text-primary hover:underline underline-offset-2"
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Nav;
