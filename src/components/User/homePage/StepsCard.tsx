const StepsCard = () => {
  return (
    <>
      <div className="h-[350px]">
        {/* Placeholder for an image */}
        {/* 
          <Image
            rounded="lg"
            objectFit="cover"
            width="100%"
            height="100%"
            src="https://your-image-url.png"
          />
          */}
      </div>
      <ul className="flex flex-col justify-center">
        {/* Step 1 */}
        <li className="mt-8">
          <div className="flex">
            <div className="font-mono flex-shrink-0 w-8 h-8 bg-yellow-300 text-white text-xl flex justify-center items-center rounded-sm font-semibold">
              1
            </div>
            <div className="flex flex-col ms-3">
              <p>Book a service</p>
              <p className="text-indigo-950/80">
                Search and book a service you want
              </p>
            </div>
          </div>
        </li>

        {/* Step 2 */}
        <li className="mt-8">
          <div className="flex">
            <div className="font-mono flex-shrink-0 w-8 h-8 bg-yellow-300 text-white text-xl flex justify-center items-center rounded-sm font-semibold">
              2
            </div>
            <div className="flex flex-col ms-3">
              <p>Relax while we fix it</p>
              <p className="text-indigo-950/80">
                Handyman will reach out to your location and fix the issues
              </p>
            </div>
          </div>
        </li>

        {/* Step 3 */}
        <li className="mt-8">
          <div className="flex">
            <div className="font-mono flex-shrink-0 w-8 h-8 bg-yellow-300 text-white text-xl flex justify-center items-center rounded-sm font-semibold">
              3
            </div>
            <div className="flex flex-col ms-3">
              <p>Payment</p>
              <p className="text-indigo-950/80">Pay after the work is done</p>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default StepsCard;
