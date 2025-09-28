import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../data/api";
import { useState } from "react";

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

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
                {post?.length > 0
                    ? post.map((p) => (
                          <Link to={`/post/${p._id}`} state={{ url: p.url }}>
                              {" "}
                              <img
                                  key={p._id}
                                  src={p.url}
                                  alt="Post Image"
                                  className="w-full h-auto object-cover rounded-lg shadow"
                              />
                          </Link>
                      ))
                    : null}
            </div>
        </>
    );
};

export default SinglePost;
