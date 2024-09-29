'use server'

import { db } from '../index'; 
import { postCommentsTable, postsTable } from '@/db/schema';
import { eq } from "drizzle-orm";
import { revalidatePath } from 'next/cache';

/**
 * Update a comment's text by its ID.
 * @param id - The ID of the comment to update.
 * @param updatedText - The new text of the comment.
 */
export async function updateCommentText(id: number, updatedText: string) {
  try {
    await db
      .update(postCommentsTable)
      .set({ comment: updatedText })
      .where(eq(postCommentsTable.id,id));
  } catch (error) {
    console.error('Error updating comment:', error);
    throw new Error('Unable to update comment.');
  }
}

/**
 * Update a post by its ID.
 * @param postId - The ID of the post to update.
 * @param updatedData - An object containing the fields to update.
 */
export async function updatePost(
  postId: number,
  updatedData: Partial<{ title: string; content: string; coverImage: string; excerpt: string; date: Date }>
) {
  try {
    await db
      .update(postsTable)
      .set({
        ...updatedData,
        coverImage: updatedData.coverImage ? Buffer.from(updatedData.coverImage, 'base64') : undefined
      })
      .where(eq(postsTable.id, postId));

      revalidatePath('/');
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Unable to update the post.');
  }
}
