import LeftImage from "../assets/images/image 2 28.png";
import RightImage from "../assets/images/image 227.png";
import TopImage from "../assets/images/image.png";
import BottomImage from "../assets/images/images.png";

export default function HeroSection() {
  return (
    <section className="customContainer grid grid-cols-1 lg:grid-cols-3 min-h-[60rem] gap-10 my-14">
      {/* left section */}
      <div className="hidden lg:block bg-[#E0E0E0] relative rounded-lg">
        <img
          src={LeftImage}
          alt="Left-Image"
          className="absolute bottom-0 h-[568px] object-contain"
        />
      </div>

      {/* middle section */}
      <div className="flex items-center sm:justify-between flex-col gap-40 sm:gap-10 w-full relative">
        <div>
          <img src={TopImage} alt="Top-Image" className="object-contain " />
        </div>
        <div className="w-full !uppercase text-center grid gap-4">
          <p className="text-4xl text-gray-300 mx-auto">let's shopping</p>
          <h2 className="!text-8xl !uppercase">Fashion</h2>
          <p className="tracking-widest !max-w-full">new collection</p>
          <button className="btn uppercase !w-max mx-auto">Shop Now</button>
        </div>
        <div>
          <img
            src={BottomImage}
            alt="Bottom-Image"
            className="object-contain "
          />
        </div>
      </div>
      {/* right section */}
      <div className="hidden bg-[#E0E0E0] relative lg:flex justify-center rounded-lg">
        <img
          src={RightImage}
          alt="Right-Image"
          className="h-[568px] object-contain absolute bottom-0 w-[60%]"
        />
      </div>
    </section>
  );
}
