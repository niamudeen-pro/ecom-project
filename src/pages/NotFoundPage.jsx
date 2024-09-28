import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flexCenter">
      <div className="text-center flex flex-col gap-8">
        <h1 className="text-gray-300 uppercase font-bold">404</h1>
        <h2 className="font-semibold uppercase">oops ! page not found</h2>
        <Link to="/">
          <button className="btn uppercase">go back</button>
        </Link>
      </div>
    </section>
  );
}
