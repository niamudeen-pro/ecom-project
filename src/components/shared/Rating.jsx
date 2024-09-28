import { FaStar } from "react-icons/fa6";
export default function Rating({ count = 5 }) {
  return (
    <div className="flex">
      {Array.from({ length: count }).map((_, index) => (
        <FaStar key={index} className="text-yellow-500" size={12} />
      ))}
    </div>
  );
}
