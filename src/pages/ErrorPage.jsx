import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="section customContainer min-h-[80vh] flexCenter flex-col gap-8">
      <h2 className="text-3xl">Error has occured ! please try again.</h2>
      <Link to="/">
        <button className="btn capitalize">continue shopping</button>
      </Link>
    </section>
  );
}
