CREATE TABLE "favorites" (
  "client_id" UUID NOT NULL,
  "professional_id" UUID NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY ("client_id", "professional_id")
);