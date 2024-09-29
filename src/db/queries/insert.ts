'use server'

import { db } from "@/db";
import { usersTable, InsertUser, postCommentsTable, InsertPostComment, postsTable } from "@/db/schema";
import { revalidatePath } from 'next/cache'

export async function insertUser(data: InsertUser): Promise<InsertUser> {
  try {
    const result = await db.insert(usersTable).values(data).returning();

    return result[0];
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}

/**
 * Insert a new comment into the post_comments table.
 * @param commentData - Data for the new comment.
 * @returns The inserted comment or an error.
 */
export async function insertComment(commentData: Omit<InsertPostComment, 'id' | 'createdAt'>) {
  try {
    const newComment = await db.insert(postCommentsTable).values(commentData).returning();
    return newComment;
  } catch (error) {
    console.error('Error inserting comment:', error);
    throw new Error('Unable to insert comment.');
  }
}

export type InsertPost = {
  title: string;
  content: string;
  authorName: string;
  authorId: number;
  coverImage: string;
  date?: Date;
  excerpt?: string;
};

/**
 * Insert a new post into the posts table.
 * @param postData - Data for the new post.
 * @returns The inserted post or an error.
 */
export async function insertPost(postData: Omit<InsertPost, 'id' | 'date' | 'excerpt'>) {
  try {

    const coverImageBinary = Buffer.from(postData.coverImage, 'base64');

    // Insert the post into the database
    await db
      .insert(postsTable)
      .values({
        ...postData,
        date: new Date(),
        coverImage: coverImageBinary,
        excerpt: postData.content.substring(0, 20),
      })

    revalidatePath('/');

    return null;
  } catch (error) {
    throw new Error('Unable to insert post.');
  }
}