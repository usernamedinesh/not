import { useState } from "react";
import { userVerify } from "../data/api";
import toast from "react-hot-toast";

const SWGWM = () => {
  const [isVerifying, setIsVarifying] = useState(false);
  const [token, setToken] = useState("");
  const handleVerify = async () => {
    setIsVarifying(true);
    try {
      const response = await userVerify(token);
      if (response?.success) {
        localStorage.setItem(response.data.token, "token");
        toast.success("VERIFED SUCCESSFULLY");
      }
    } catch (error) {
      console.error("error verifying", error);
    } finally {
      setIsVarifying(false);
    }
  };
  return (
    <>
      <div className=" text-center mt-10 font-bold text-4xl">
        AUTHTHENTICATIOIN
      </div>
      <div className="mb-4 w-1/2 text-center justify-center mx-auto mt-10">
        <label
          htmlFor="token"
          className="text-center text-sm font-medium text-gray-700 mb-1 sm:text-3xl "
        >
          Token
        </label>
        <input
          id="token"
          type="text"
          placeholder="Enter token"
          required
          onChange={(e) => setToken(e.target.value)}
          className="mt-5 text-center w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {!isVerifying ? (
          <button
            className="mt-5 border bg-lime-400 hover:border-2 px-5 py-2 rounded font-bold"
            onClick={handleVerify}
          >
            VERIFY
          </button>
        ) : (
          <button className="mt-5 border bg-lime-400 hover:border-2 px-5 py-2 rounded font-bold">
            VERIFYING...
          </button>
        )}
      </div>
    </>
  );
};

export default SWGWM;
