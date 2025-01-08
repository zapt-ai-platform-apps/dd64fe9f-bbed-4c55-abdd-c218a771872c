CREATE TABLE "profiles" (
  "user_id" UUID PRIMARY KEY,
  "name" TEXT NOT NULL,
  "bio" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);