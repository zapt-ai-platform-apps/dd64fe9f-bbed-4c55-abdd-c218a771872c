CREATE TABLE "roles" (
  "user_id" UUID PRIMARY KEY,
  "role" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);