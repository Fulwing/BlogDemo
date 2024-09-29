"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import { getPostById } from "@/db/queries/select";
import { updatePost } from "@/db/queries/update";
import { SelectPost } from "@/db/schema";
import 'react-toastify/dist/ReactToastify.css'; // Ensure this CSS import is included

// Loading Spinner Component
function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-16 w-16 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  export default function EditPost({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [post, setPost] = useState<SelectPost | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
  
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    useEffect(() => {
      async function fetchPost() {
        try {
          const postId = parseInt(params.id, 10);
          const fetchedPost = await getPostById(postId);
  
          if (fetchedPost) {
            setPost(fetchedPost);
            setTitle(fetchedPost.title);
            setContent(fetchedPost.content);
          } else {
            setError("Post not found.");
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          setError("Failed to fetch post data.");
        } finally {
          setIsLoadingPost(false);
        }
      }
      fetchPost();
    }, [params.id]);
  
    // Handle file input change and check file size
    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.size > 1024 * 1024) { // Check if file size is greater than 1MB
          toast.error("File size must be less than 1MB. Please select a smaller file.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCoverImage(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          setCoverImage(file);
        }
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      // Ensure the coverImage is not too large before submission
      if (coverImage && coverImage.size > 1024 * 1024) {
        toast.error("File size must be less than 1MB. Please select a smaller file.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
        return;
      }
  
      try {
        const updatedData: Partial<{ title: string; content: string; coverImage: string }> = {
          title,
          content,
        };
  
        if (coverImage) {
          // Convert the cover image to Base64 before sending to the database
          const coverImageArrayBuffer = await coverImage.arrayBuffer();
          const coverImageBase64 = Buffer.from(coverImageArrayBuffer).toString('base64');
          updatedData.coverImage = coverImageBase64;
        }
  
        await updatePost(parseInt(params.id, 10), updatedData);
  
        toast.success("Post updated successfully!");
  
        router.push(`/posts/${params.id}`);
      } catch (err) {
        setError("Failed to update the post");
        toast.error("Failed to update the post.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    };
  
    if (isLoadingPost) {
      return <LoadingSpinner />;
    }
  
    if (error) {
      return (
        <div className="max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-tr from-white to-yellow-100 shadow-xl rounded-lg">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
            {error}
          </h2>
        </div>
      );
    }
  
    return (
      <div className="max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-tr from-white to-yellow-100 shadow-xl rounded-lg transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
          Edit Your Post
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6"
          autoComplete="off"
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder="Enter Post Title"
            className="border-2 border-yellow-200 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-shadow duration-300 shadow-md text-gray-700 placeholder-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextareaAutosize
            minRows={6}
            placeholder="Write your content in Markdown format..."
            className="border-2 border-yellow-200 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-shadow duration-300 shadow-md text-gray-700 placeholder-gray-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="flex flex-col space-y-2">
            <label className="text-gray-800 font-semibold">
              Upload a cover image (JPEG, PNG) under 1MB
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              ref={fileInputRef}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-6 text-center">
          You can use Markdown syntax to format your content.
        </p>
      </div>
    );
  }