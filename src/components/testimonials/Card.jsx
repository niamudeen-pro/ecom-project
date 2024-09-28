import Rating from "../shared/Rating";

export default function TestmonialCard({ slide }) {
  return (
    <div className="bg-white max-w-[40rem] w-full flex gap-8 p-14 shadow-lg rounded-lg">
      <div>
        <img
          src={slide.img}
          alt="Slide"
          className="w-[20rem] h-40 object-cover"
        />
      </div>
      {/* content section */}
      <div className="space-y-5 capitalize">
        <p className="text-black/45">
          "You won't regret it. I would like to personally thank you for your
          outstanding product. Absolutely wonderful!"
        </p>
        <Rating count={5} />
        <hr className="w-1/2" />
        <h4 className="text-black text-3xl">James K.</h4>
        <p>author</p>
      </div>
    </div>
  );
}
