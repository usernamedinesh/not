import { Link } from "react-router-dom";

export const Team = (props) => {
  console.log("prop", props);
  return (
    <div className="text-center bg-green-200 py-16 rounded-4xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-600 mb-4">
            Meet the Team
          </h2>
          <p className="font-bold sm:text-3xl">
            Behind every great product is a great team — meet the minds driving
            our innovation and success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {props.data ? (
            props.data.map((d, i) => (
              <div
                key={`${d.name}-${i}`}
                className=" text-center transform transition-transform duration-300 ease-in-out hover:scale-90"
              >
                <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:drop-shadow-white">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="w-full sm:h-[600px] object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {d.name}
                    </h4>
                    <p className="text-gray-600">{d.job}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};
