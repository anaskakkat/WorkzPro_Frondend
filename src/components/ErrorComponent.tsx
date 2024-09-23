import { useNavigate } from "react-router-dom";

// ErrorComponent.jsx
const ErrorComponent = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-500 y-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-blue-900 md:text-4xl ">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-800 ">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <button
            className="inline-flex bg-blue-600 text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center primary-900 my-4"
            onClick={() => navigate("/")}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErrorComponent;
