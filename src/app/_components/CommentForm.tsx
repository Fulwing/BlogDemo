'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface CommentFormProps {
  onAddComment: (comment: { author: string; authorId: string; text: string; date: Date }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const { data: session } = useSession();
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text || !session?.user) return;

    onAddComment({
      author: session.user.name!,
      authorId: session.user.id!,
      text,
      date: new Date(),
    });

    setText('');
  };

  return (
    <div>
      {session?.user ? (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            placeholder="Your comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Comment
          </button>
        </form>
      ) : (
        <p className="text-gray-500">Log in to leave a comment.</p>
      )}
    </div>
  );
};

export default CommentForm;
