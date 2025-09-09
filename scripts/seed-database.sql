-- Seeding database with initial data
-- Insert demo users
INSERT INTO users (id, name, email, password, role) VALUES
('1', 'Admin User', 'admin@example.com', '$2b$10$rOvHdKzjbQIqBqTXCmVxWOYpVzQzSlYwQpNiU8PjdU8YvTxvUvYyC', 'admin'),
('2', 'John Doe', 'student@example.com', '$2b$10$rOvHdKzjbQIqBqTXCmVxWOYpVzQzSlYwQpNiU8PjdU8YvTxvUvYyC', 'student'),
('3', 'Jane Smith', 'jane@example.com', '$2b$10$rOvHdKzjbQIqBqTXCmVxWOYpVzQzSlYwQpNiU8PjdU8YvTxvUvYyC', 'student'),
('4', 'Mike Johnson', 'mike@example.com', '$2b$10$rOvHdKzjbQIqBqTXCmVxWOYpVzQzSlYwQpNiU8PjdU8YvTxvUvYyC', 'student');

-- Insert demo students
INSERT INTO students (id, user_id, name, email, course, enrollment_date, status) VALUES
('1', '2', 'John Doe', 'student@example.com', 'MERN Bootcamp', '2024-01-15', 'active'),
('2', '3', 'Jane Smith', 'jane@example.com', 'React Fundamentals', '2024-02-01', 'active'),
('3', '4', 'Mike Johnson', 'mike@example.com', 'Full Stack Development', '2024-01-20', 'inactive');
