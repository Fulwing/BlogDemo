"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deletePostById } from '@/db/queries/delete';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type ActionDropdownProps = {
  post: {
    id: number;
    authorId: number;
  };
};

export default function ActionDropdown({ post }: ActionDropdownProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isAuthor = session?.user?.id === post.authorId.toString();

  const handleEdit = () => {
    router.push(`/protected/edit/${post.id}`);
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deletePostById(post.id);

        toast.success("Post deleted successfully!");

        router.push("/");
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error('Error: Unable to delete the post.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  if (!isAuthor) return null;

  return (
    <div className="relative mt-4 flex justify-end">
      <button
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        ...
      </button>
      {showDropdown && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
          <button
            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="block w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-100"
            onClick={() => setShowConfirmModal(true)}
          >
            Delete
          </button>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={() => {
                  handleDelete();
                  setShowConfirmModal(false);
                }}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
