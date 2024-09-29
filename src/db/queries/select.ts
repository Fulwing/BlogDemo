'use server'

import { db } from "@/db";
import { usersTable, SelectUser, postCommentsTable, SelectPostComment, postsTable, SelectPost } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getUserByUsername(username: SelectUser['username']): Promise<SelectUser | null> {
  const user = await db.select().from(usersTable).where(
    eq(usersTable.username, username)
  ).limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

/**
 * Fetch comments for a specific post by postId.
 * @param postId - The ID of the post.
 * @returns A list of comments.
 */
export async function getAllCommentsByPostId(postId: number): Promise<SelectPostComment[]> {
  try {
    const comments = await db
      .select()
      .from(postCommentsTable)
      .where(eq(postCommentsTable.postId, postId))
      .orderBy(desc(postCommentsTable.createdAt));
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Unable to fetch comments.');
  }
}

/**
 * Fetch all posts.
 * @returns A list of all posts.
 */
export async function getAllPosts(): Promise<SelectPost[]> {
  try {
    const posts = await db
      .select()
      .from(postsTable)
      .orderBy(desc(postsTable.date));
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Unable to fetch posts.');
  }
}

/**
 * Fetch a post by its ID.
 * @param postId - The ID of the post.
 * @returns The post data if found, otherwise null.
 */
export async function getPostById(postId: number): Promise<SelectPost | null> {
  try {
    const post = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, postId))
      .limit(1);

    if (post.length === 0) {
      return null;
    }

    return post[0];
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error('Unable to fetch the post.');
  }
}