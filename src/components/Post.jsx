import { Link } from "react-router-dom";
import LoadingWave from "./LoadingWave";

const POST = ({ data }) => {
  console.log("data: ", data);
  return (
    <>
      <div>
        <div className="bg-slate-500 hover:bg-slate-200 mx-[20%] h-24  text-center  justify-center py-6 mt-10 rounded-lg border-2 hover:shadow-2xl">
          <h1 className="font-bold  font-stretch-condensed  md:text-4xl text-red-400">
            ENJOY WITH THIS NOTES
          </h1>
        </div>
        <div className="mt-10  px-2 md:px-5 lg:px-11 pt-1 pb-2 sm:py-10 bg-slate-200 rounded-b-full">
          {data.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
              {data.map((item, index) => (
                <Link to={`${item._id}`}>
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-2 sm:p-4 hover:shadow-lg transition duration-300 group"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="transform w-full h-40 lg:h-60 object-cover rounded-md mb-3 transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className="text-gray-800 font-medium lg:text-xl text-center">
                      {item.title}
                    </p>
                    <p className="text-gray-800 text-[12px] sm:font-medium text-center">
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <LoadingWave />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default POST;
