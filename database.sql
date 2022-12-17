CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(50) NOT NULL,
	"completed" BOOLEAN
);

INSERT INTO "tasks"
("task", "completed")
VALUES
('Walk the dog', 'y'),
('Buy groceries', 'n'),
('Win a puppy', 'n'),
('Build a snowman', 'y');