import { useLocation, useParams, useNavigate } from "react-router-dom";

const SingleImage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Get the URL from passed state
    const imageUrl = location.state?.url;

    // Handle if no URL was passed (e.g., direct navigation to /:id)
    if (!imageUrl) {
        return (
            <div className="text-center mt-10 text-red-500">
                Image not found or missing data.
                <br />
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 text-white text-xl bg-black bg-opacity-50 px-3 py-1 rounded"
            >
                ⬅ Back
            </button>

            <img
                src={imageUrl}
                alt="Full Image"
                className="max-w-full max-h-full rounded-lg shadow-lg"
            />
        </div>
    );
};

export default SingleImage;
