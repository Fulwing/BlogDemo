import { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  authorId: string;
  text: string;
  date: Date;
}

interface CommentItemProps {
  comment: Comment;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedText: string) => void;
  canEdit: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDelete,
  onEdit,
  canEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleEdit = () => {
    onEdit(comment.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-sm">
      <h4 className="font-semibold text-lg">{comment.author}</h4>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <p className="text-gray-700">{comment.text}</p>
      )}
      <small className="text-gray-400">{comment.date.toLocaleString()}</small>
      {canEdit && (
        <div className="flex space-x-2 mt-2">
          {isEditing ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(comment.id)}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
