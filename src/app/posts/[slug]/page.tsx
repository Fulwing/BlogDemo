import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import Comments from "@/app/_components/Comments";
import { getPostById } from "@/db/queries/select";
import ActionDropdown from "@/app/_components/ActionDropdown";

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostById(Number(params.slug));

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header />
        <ActionDropdown post={{ id: post.id, authorId: post.authorId }} />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={`data:image/jpeg;base64,${post.coverImage.toString("base64")}`}
            date={post.date.toISOString()}
            author={post.authorName}
          />
          <PostBody content={content} />
          <Comments postId={post.id} />
        </article>
      </Container>
    </main>
  );
}

// export async function generateStaticParams() {
//   const posts = await getAllPosts();

//   return posts.map((post) => ({
//     slug: post.id.toString(),
//   }));
// }
