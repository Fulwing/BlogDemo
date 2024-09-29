import { SelectPost } from "@/db/schema";
import { PostPreview } from "./post-preview";

type Props = {
  posts: SelectPost[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            title={post.title}
            coverImage={`data:image/jpeg;base64,${post.coverImage.toString('base64')}`}
            date={post.date.toISOString()}
            author={post.authorName}
            slug={post.id.toString()}
            excerpt={post.excerpt.replace(/[#*>\-~_`+![\]()|{}]/g, "").replace(/<[^>]*>/g, "")}
          />
        ))}
      </div>
    </section>
  );
}
