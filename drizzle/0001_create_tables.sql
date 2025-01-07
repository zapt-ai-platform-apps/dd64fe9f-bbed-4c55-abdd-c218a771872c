CREATE TABLE "statuses" (
  "user_id" UUID PRIMARY KEY,
  "status" TEXT NOT NULL,
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);