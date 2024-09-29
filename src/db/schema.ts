import { pgTable, serial, text, integer, varchar, timestamp, customType } from 'drizzle-orm/pg-core';

const customBytea = customType<{ data: Buffer }>({
  dataType() {
    return 'bytea';
  },
});

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

export const postCommentsTable = pgTable('post_comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull(),
  userId: integer('user_id').notNull(),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const postsTable = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  coverImage: customBytea('cover_image').notNull(),
  date: timestamp('date').notNull(),
  authorName: varchar('author_name', { length: 255 }).notNull(),
  authorId: integer('author_id').notNull(),
  content: text('content').notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPostComment = typeof postCommentsTable.$inferInsert;
export type SelectPostComment = typeof postCommentsTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;