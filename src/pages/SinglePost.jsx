import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteImages, getPostById } from "../data/api";
import { useState } from "react";
import toast from "react-hot-toast";
import AddImageUploader from "../components/UploadImage";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isDeleting, setIsdeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDelete = async (postId, imageId) => {
    try {
      setIsdeleting(true);
      const response = await deleteImages(id, imageId._id);
      if (response.success) {
        toast.success("Image deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting image", error);
    } finally {
      setIsdeleting(false);
    }
  };
  const handleUpdate = async (post, id) => {
    try {
      setIsUpdating(true);
      const response = await updateSingleImage(id);
      if (response.success) {
        toast.success("Image updated successfully");
      }
    } catch (error) {
      console.error("error updating image", error);
    } finally {
      setIsUpdating(false);
    }
  };
  const handleAddImage = async () => {
    try {
      setIsUploading(true);
      const response = await upoadSingleImage(id);
      if (response.success) {
        toast.success("Image uplaoded successfully");
      }
    } catch (error) {
      console.error("error adding image", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostById(id);
      setPost(response.data.images);
    };
    fetchPost();
  }, [id]);

  if (post === null) {
    return <>loading</>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {post?.length > 0 ? (
          post.map((p) => (
            <Link to={`/post/${p._id}`} state={{ url: p.url }}>
              <div>
                {" "}
                <img
                  key={p._id}
                  src={p.url}
                  alt="Post Image"
                  className="w-full h-auto object-cover rounded-lg shadow"
                />
                <div className="flex gap-4 py-3 justify-center items-center">
                  {isDeleting ? (
                    <div>...</div>
                  ) : (
                    <button
                      className="px-2 py-1.5 bg-blue-500 rounded text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDelete(post, p);
                      }}
                    >
                      delete
                    </button>
                  )}
                  <button
                    className="px-2 py-1.5 bg-green-500 rounded text-white"
                    onClick={() => handleUpdate(post, p)}
                  >
                    update
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>no post found</div>
        )}
      </div>
      <div>
        <AddImageUploader id={id} />
      </div>
    </>
  );
};

export default SinglePost;
