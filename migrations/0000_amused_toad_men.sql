CREATE TABLE IF NOT EXISTS "post_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"cover_image" "bytea" NOT NULL,
	"date" timestamp NOT NULL,
	"author_name" varchar(255) NOT NULL,
	"author_id" integer NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_table_username_unique" UNIQUE("username")
);
