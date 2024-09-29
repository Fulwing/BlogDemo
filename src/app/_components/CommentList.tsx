import CommentItem from './CommentItem';
import { Session } from 'next-auth';

interface Comment {
  id: number;
  author: string;
  authorId: string;
  text: string;
  date: Date;
}

interface CommentListProps {
  comments: Comment[];
  onDeleteComment: (id: number) => void;
  onEditComment: (id: number, updatedText: string) => void;
  session: Session | null;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onDeleteComment,
  onEditComment,
  session,
}) => {
  return (
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={onDeleteComment}
            onEdit={onEditComment}
            canEdit={session?.user?.id === comment.authorId}
          />
        ))
      ) : (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentList;
