'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { insertComment } from '@/db/queries/insert';
import { getAllCommentsByPostId } from '@/db/queries/select';
import { updateCommentText } from '@/db/queries/update';
import { deleteCommentById } from '@/db/queries/delete';

interface Comment {
  id: number;
  author: string;
  authorId: string;
  text: string;
  date: Date;
}

const Comments: React.FC<{ postId: number }> = ({ postId }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getAllCommentsByPostId(postId);
        setComments(
          data.map((comment) => ({
            id: comment.id,
            author: session?.user?.name!,
            authorId: String(comment.userId),
            text: comment.comment,
            date: new Date(comment.createdAt),
          }))
        );
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [session]);

  const handleAddComment = async (newComment: Omit<Comment, 'id' | 'date'>) => {
    if (!session?.user) return;

    try {
      const savedComment = await insertComment({
        postId: postId,
        userId: parseInt(newComment.authorId),
        comment: newComment.text,
      });

      setComments([
        ...comments,
        { ...newComment, id: savedComment[0].id, date: new Date(savedComment[0].createdAt) },
      ]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteCommentById(id);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = async (id: number, updatedText: string) => {
    try {
      await updateCommentText(id, updatedText);
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, text: updatedText } : comment
        )
      );
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div className="comments space-y-6">
      <h3 className="text-2xl font-bold">Comments</h3>
      {session?.user ? (
        <CommentForm onAddComment={handleAddComment} />
      ) : (
        <p className="text-gray-500">Log in to leave a comment.</p>
      )}
      <CommentList
        comments={comments}
        onDeleteComment={handleDeleteComment}
        onEditComment={handleEditComment}
        session={session}
      />
    </div>
  );
};

export default Comments;
