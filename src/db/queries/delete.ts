'use server'

import { revalidatePath } from 'next/cache';
import { db } from '../index'; 
import { postCommentsTable, postsTable } from '../schema';
import { eq } from "drizzle-orm";

/**
 * Delete a comment by its ID.
 * @param id - The ID of the comment to delete.
 */
export async function deleteCommentById(id: number) {
  try {
    await db.delete(postCommentsTable).where(eq(postCommentsTable.id, id));
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error('Unable to delete comment.');
  }
}

/**
 * Delete a post by its ID.
 * @param id - The ID of the post to delete.
 */
export async function deletePostById(id: number) {
  try {
    await db.delete(postsTable).where(eq(postsTable.id, id));
    
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Unable to delete post.');
  }
}
