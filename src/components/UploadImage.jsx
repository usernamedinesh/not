import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { uploadImage } from "../data/api";
import toast from "react-hot-toast";

const AddImageUploader = ({ id }) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("swgwm");
    if (token) {
      setAuth(true);
    }
  }, []);

  const [images, setImages] = useState([]);
  const [isUploading, setIsUplaoding] = useState(false);
  const maxNumber = 15;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    console.log("Selected image:", imageList);
  };

  const handleUpload = async () => {
    if (images.length === 0) return alert("Please select images first.");
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append("images", image.file);
    });
    setIsUplaoding(true);
    try {
      const response = await uploadImage(formData, id);
      if (response.success) {
        toast.success("Image Upload successfully");
      }
    } catch (error) {
      console.error("error uplading iamge", error);
    } finally {
      setIsUplaoding(false);
    }
  };

  return (
    <div className="my-6">
      <ImageUploading
        multiple={true}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png", "jpeg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // Render UI
          <div className="upload__image-wrapper">
            {auth ? (
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className="mx-4  bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                ADD Image
              </button>
            ) : null}

            {imageList.length > 0 && (
              <div className="mt-4">
                {imageList.map((image, index) => (
                  <div key={index} className="relative inline-block">
                    <img
                      src={image["data_url"]}
                      alt=""
                      className="w-64 h-auto rounded shadow-lg"
                    />
                    {auth ? (
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => onImageUpdate(index)}
                          className="bg-yellow-400 px-2 py-1 rounded"
                        >
                          Updates
                        </button>
                        <button
                          onClick={() => onImageRemove(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
            {auth ? (
              !isUploading ? (
                <button
                  className="mt-4 mx-8 rounded py-1.5 px-2 bg-lime-400 text-white font-bold"
                  onClick={handleUpload}
                >
                  UPLOAD
                </button>
              ) : (
                <button className="mt-4 mx-8 rounded py-1.5 px-2 bg-lime-400 text-white font-bold">
                  UPLOADING...
                </button>
              )
            ) : null}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default AddImageUploader;
