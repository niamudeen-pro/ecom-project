import { Link } from "react-router-dom";
import BrandImage from "../../assets/images/shopping-bag_3.png";
import { FOOTER_LINKS } from "../../constants";

export default function Footer() {
  return (
    <footer className="customContainer py-10 space-y-10">
      <section className="flex flex-col sm:flex-row sm:justify-between  gap-8">
        <Link to={"/"}>
          <img src={BrandImage} alt="Brand Logo" className="w-16" />
        </Link>
        <nav className="hidden">
          <ul className="flex flex-col sm:flex-row justify-start sm:justify-between gap-4 sm:gap-14 capitalize ">
            {FOOTER_LINKS.map((menu) => (
              <li key={menu.id}>{menu.name}</li>
            ))}
          </ul>
        </nav>
      </section>
      <div></div>
      <p className="capitalize mx-auto">
        copyright@ 2024 Ecom. All rights reserved
      </p>
    </footer>
  );
}
