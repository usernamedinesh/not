import { useState, useEffect, useRef } from "react";
import ImageUploading from "react-images-uploading";
import { createPost } from "../data/api";
import toast from "react-hot-toast";
import LoadingWave from "./LoadingWave";

const UploadButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const modalRef = useRef(null);

  // Handle outside clicks to close modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || thumbnail.length === 0 || !thumbnail[0].file) {
      toast.error("Please provide a title and thumbnail");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);

    // Append thumbnail (single image)
    const thumbnailFile = thumbnail[0].file;
    if (thumbnailFile instanceof File) {
      formData.append("thumbnail", thumbnailFile);
    } else {
      toast.error("Invalid thumbnail file.");
      return;
    }

    // Append multiple images
    images.forEach((imgObj, i) => {
      if (imgObj?.file instanceof File) {
        formData.append("images", imgObj.file); // The backend expects this key
      }
    });

    try {
      setLoading(true);
      const response = await createPost(formData);
      if (response?.success) {
        toast.success("Post created successfully");
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.error("error creating post", error);
    } finally {
      setLoading(false);
      setShowModal(false);
      setTitle("");
      setThumbnail([]);
      setImages([]);
    }
  };

  // Thumbnail change handler
  const onThumbnailChange = (imageList) => {
    const Limit = 1;
    if (imageList.length > Limit) {
      return;
    }
    setThumbnail(imageList);
  };

  // Images change handler
  const onImagesChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <>
      {/* Plus icon to open modal */}
      <div
        className="h-[330px] flex items-center justify-center bg-white hover:bg-slate-200 rounded-md shadow-2xl cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <img
          src="/plus.svg"
          alt="Add Post"
          className="w-full h-52 transform transition-all hover:scale-125 duration-300"
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0   backdrop-blur-sm flex items-center justify-center z-10">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 w-[800px] border-2  border-blue-500"
          >
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter post title"
                  required
                />
              </div>

              {/* Thumbnail Picker */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image
                </label>
                <ImageUploading
                  value={thumbnail}
                  onChange={onThumbnailChange}
                  maxNumber={1}
                  dataURLKey="data_url"
                  acceptType={["jpg", "png"]}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    <div className="thumbnail-upload">
                      <button
                        type="button"
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        className="w-full border-2 border-dashed border-gray-300 p-2 rounded text-gray-600 hover:bg-gray-100 mb-2"
                      >
                        Click or drop thumbnail here
                      </button>
                      {imageList.map((image, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <img
                            src={image["data_url"]}
                            alt="Thumbnail"
                            width="200"
                          />
                          <button
                            type="button"
                            onClick={() => onImageRemove(index)}
                            className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </div>

              {/* Images Picker */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Images
                </label>
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onImagesChange}
                  maxNumber={5}
                  dataURLKey="data_url"
                  acceptType={["jpg", "png"]}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    <div className="images-upload ">
                      <button
                        type="button"
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        className="w-full border-2 border-dashed border-gray-300 p-2 rounded text-gray-600 hover:bg-gray-100 mb-2 "
                      >
                        Click or drop images here
                      </button>
                      <div className="flex flex-row gap-2">
                        {imageList.map((image, index) => (
                          <div key={index} className=" gap-2 mb-2 ">
                            <img src={image["data_url"]} alt="" width="200" />
                            <div className="flex gap-2 mt-2 px-6">
                              <button
                                type="button"
                                onClick={() => onImageUpdate(index)}
                                className="bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                onClick={() => onImageRemove(index)}
                                className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {imageList.length > 0 && (
                        <button
                          type="button"
                          onClick={onImageRemoveAll}
                          className="bg-gray-500 text-white text-sm px-2 py-1 rounded hover:bg-gray-600"
                        >
                          Remove all images
                        </button>
                      )}
                    </div>
                  )}
                </ImageUploading>
              </div>

              {/* Form Actions */}
              {!isLoading ? (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div>
                  {" "}
                  <LoadingWave />
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadButton;
