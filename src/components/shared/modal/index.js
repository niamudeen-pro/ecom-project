import { useState } from "react";

export default function Modal({ isShow }) {
  const [show, setShow] = useState(isShow);

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {show && (
        <section className="fixed inset-0 w-full h-full bg-red-500 bg-black/30 flexCenter z-50">
          <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden
        "
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full ">
              {/* modal starts here */}
              <div className="relative bg-white shadow rounded-xl p-5">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Terms of Service
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={handleClose}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* modal contet goes here */}
                <div className="p-4 md:p-5  space-y-4">
                  <p className="text-base leading-relaxed text-gray-500">
                    With less than a month to go before the European Union
                    enacts new consumer privacy laws for its citizens, companies
                    around the world are updating their terms of service
                    agreements to comply.
                  </p>
                </div>
                {/* modal action buttons */}
                <div className="flex items-center p-4 md:p-5 rounded-b gap-x-5">
                  <button type="button" className="btn" onClick={handleClose}>
                    I accept
                  </button>
                  <button
                    type="button"
                    className="btn
              !bg-transparent
              !text-black"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
