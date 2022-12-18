CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(80) NOT NULL,
	"completed" BOOLEAN NOT NULL
);

INSERT INTO "tasks"
("task", "completed")
VALUES
('Walk the dog', true),
('Buy groceries', false),
('Win a puppy', false),
('Build a snowman', true);