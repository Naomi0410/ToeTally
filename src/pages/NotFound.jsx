import { Link } from "react-router-dom";

const NotFound = () => {
  return (    
    <div className="flex flex-col gap-4 py-10">
      <div>
        <h1 className="font-extrabold text-black text-[30px] text-center">Oops!</h1>
      </div>

      <div className="relative flex justify-center mt-8">
        <img src="/404.svg" alt="404 image" className="w-[300px] lg:w-[600px]" />
        <img src="/404img.svg" alt="404 image" className="absolute top-0 mx-auto w-[130px] lg:w-[260px]" />
      </div>

      <div>
        <h2 className="text-center text-[30px] font-semibold">Page Not Found</h2>
      </div>

      {/* Go Home Button */}
      <Link to="/" className="flex gap-2 border-b-[1px] border-black items-center mx-auto mt-6 no-underline">
        <img src="/back.svg" alt="arrow" />
        <p className="mt-3 text-black">Go Home</p>
      </Link>
    </div>
  );
};

export default NotFound;
