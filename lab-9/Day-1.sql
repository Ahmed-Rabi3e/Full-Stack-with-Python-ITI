CREATE DATABASE day1;

// connect DB
\c day1

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department VARCHAR(20) CHECK (department IN ('HR', 'Finance', 'Marketing', 'IT')),
    salary NUMERIC(10,2),
    hiring_date DATE
);

INSERT INTO employee (first_name, last_name, department, salary, hiring_date) VALUES
('Ahmed', 'Rabie', 'IT', 25000, '2024-07-01'),
('Farah', 'Ali',  'Finance', 18000, '2022-05-16'),
('Mariem', 'Salah', 'HR', 22000, '2023-11-10'),
('Dina', 'Ahmed', 'Marketing', 21000, '2024-02-20'),
('Mo', 'Sofi', 'IT', 27000, '2025-01-05'),
('Hossam', 'Ali', 'Finance', 23000, '2022-07-22'),
('Safa', 'Mohamed', 'HR', 19000, '2023-03-17'),
('Hannah', 'Hassan', 'IT', 30000, '2023-12-01'),
('Ali', 'Mohamed', 'Marketing', 20000, '2024-03-28'),
('Safy', 'Mohamed ', 'Finance', 26000, '2022-01-10');

// All columns
SELECT * FROM employee;

//Select (first name, last name, department):
SELECT first_name, last_name, department FROM employee;

//Employees in department IT:
SELECT * FROM employee WHERE department = 'IT';

//Employees with salary more than 20,000:
SELECT * FROM employee WHERE salary > 20000;

//Employees hired after 2024-06-16:
SELECT * FROM employee WHERE hiring_date > '2024-06-16';

//Employees whose first name starts with any A:
SELECT * FROM employee WHERE first_name ILIKE 'A%';

//Sort employees by salary in descending order:
SELECT * FROM employee ORDER BY salary DESC;

//Employees hired from 2022 and working in Finance:
SELECT * FROM employee WHERE department = 'Finance' AND hiring_date >= '2022-01-01';

