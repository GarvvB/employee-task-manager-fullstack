-- Seed data for Employee Task Manager

-- Insert employees
INSERT INTO employees (name, role, email) VALUES
('John Doe', 'Frontend Developer', 'john.doe@company.com'),
('Jane Smith', 'Backend Developer', 'jane.smith@company.com'),
('Mike Johnson', 'Full Stack Developer', 'mike.johnson@company.com'),
('Sarah Williams', 'UI/UX Designer', 'sarah.williams@company.com');

-- Insert tasks
INSERT INTO tasks (title, status, due_date, employee_id) VALUES
('Design landing page mockup', 'Completed', '2024-01-15', 4),
('Implement user authentication', 'In Progress', '2024-01-20', 2),
('Create responsive navbar', 'Completed', '2024-01-10', 1),
('Setup database schema', 'Completed', '2024-01-12', 2),
('Build REST API endpoints', 'In Progress', '2024-01-25', 3),
('Write unit tests', 'Pending', '2024-01-30', 3),
('Optimize database queries', 'Pending', '2024-02-05', 2),
('Design user dashboard', 'In Progress', '2024-01-22', 4);
