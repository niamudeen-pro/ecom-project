import { useEffect, useState } from "react";

/*
 * This component is responsible for showing the loader on the screen.*/

export default function Loader() {
  const [show, setshow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setshow(false);
    }, 1 * 1000);
  }, []);
  return (
    <>
      {show && (
        <section className="fixed inset-0 flexCenter bg-white  z-50">
          <div className="flex space-x-2 customLoader">
            <div className="rounded-full p-2 bg-purple-600 animate-bounce"></div>
            <div className="rounded-full p-2 bg-red-500 animate-bounce"></div>
            <div className="rounded-full p-2  animate-bounce bg-green-500"></div>
          </div>
        </section>
      )}
    </>
  );
}
