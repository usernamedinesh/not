import POST from "../components/Post";
import { Team } from "../components/Team";
import jsonData from "../data/data.json";
import { getPost } from "../data/api";
import { useState } from "react";
import getDeviceInfo from "../info.js";

const HOME = () => {
  const [post, setPost] = useState([]);
  const [info, setInfo] = useState(null);

  const handler = (e) => {
    e.preventDefault();
  };
  useState(() => {
    // window.addEventListener("keydown", function (e) {
    //   // Block Ctrl/Cmd + P (print), Ctrl+S save, Ctrl+Shift+I devtools, F12
    //   if (
    //     (e.ctrlKey || e.metaKey) &&
    //     (e.key === "p" || e.key === "P" || e.key === "s" || e.key === "S")
    //   ) {
    //     e.preventDefault();
    //     alert("Printing/exporting is disabled.");
    //   }
    //   if (e.key === "PrintScreen") {
    //     e.preventDefault();
    //     alert("Screenshot is disabled.");
    //   }
    //   if (e.key === "prtscr") {
    //     e.preventDefault();
    //     alert("Screenshot is disabled.");
    //   }
    //   if (
    //     (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) ||
    //     e.key === "F12"
    //   ) {
    //     e.preventDefault();
    //   }
    // });

    const fetchPost = async () => {
      try {
        const data = await getPost();
        setPost(data.data);
      } catch (error) {
        console.error("Error loading post", error);
      }
    };

    fetchPost();
    //
    // window.addEventListener("keydown", handler);
    //
    // return () => {
    //     window.removeEventListener("keydown", handler);
    // };
  }, []);

  return (
    <>
      <POST data={post} />
      <Team data={jsonData.Team} />
    </>
  );
};

export default HOME;
