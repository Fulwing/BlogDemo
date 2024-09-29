'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { insertPost } from '@/db/queries/insert';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPost() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const coverImageArrayBuffer = await coverImage!.arrayBuffer();
      const coverImageBase64 = Buffer.from(coverImageArrayBuffer).toString('base64');

      const postData = {
        title,
        content,
        authorName: session?.user?.name!,
        authorId: parseInt(session?.user?.id!, 10),
        coverImage: coverImageBase64,
      };

      await insertPost(postData);

      toast.success('Post created successfully!');

      router.push('/');
    } catch (error) {
      toast.error('Failed to create post', {
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

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-tr from-white to-blue-100 shadow-xl rounded-lg transform transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
        Create a New Post
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
          className="border-2 border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition-shadow duration-300 shadow-md text-gray-700 placeholder-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextareaAutosize
          minRows={6}
          placeholder="Write your content in Markdown format..."
          className="border-2 border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition-shadow duration-300 shadow-md text-gray-700 placeholder-gray-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="flex flex-col space-y-2">
          <label className="text-gray-800 font-semibold">
            Upload a cover image (required)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-blue-700 hover:shadow-lg'
          }`}
          disabled={loading}
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-6 text-center">
        You can use Markdown syntax to format your content.
      </p>
    </div>
  );
}
