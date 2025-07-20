// Create students table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    gpa NUMERIC(3,2),
    is_active BOOLEAN DEFAULT TRUE,
    birth_date DATE
);

// Create courses table
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    credits INT,
    department VARCHAR(50)
);

//Insert 3 records into students
INSERT INTO students (name, age, gpa, is_active, birth_date) VALUES
('Ahmed Rabie', 22, 3.80, TRUE, '2002-05-14'),
('Ali Mohammed', 24, 2.30, TRUE, '1999-11-22'),
('Mona Salah', 21, 2.90, TRUE, '2003-03-30');

//Insert 3 records into courses
INSERT INTO courses (title, credits, department) VALUES
('Mathematics 101', 3, 'Science'),
('Intro to Programming', 4, 'IT'),
('Business', 2, 'Business');


//Insert enrollment records into student_courses
INSERT INTO student_courses (student_id, course_id) VALUES
(1, 2), (1, 1);

INSERT INTO student_courses (student_id, course_id) VALUES
(2, 3);

INSERT INTO student_courses (student_id, course_id) VALUES
(3, 2);




// Change one student's name
UPDATE students SET name = 'Ahmed Rabie' WHERE student_id = 1;


// Deactivate students with GPA below 2.5
UPDATE students SET is_active = FALSE WHERE gpa < 2.5;


// Delete all inactive students
DELETE FROM students WHERE is_active = FALSE;


// List all students with their courses (INNER JOIN)
SELECT s.name, c.title
FROM students s
INNER JOIN student_courses sc ON s.student_id = sc.student_id
INNER JOIN courses c ON sc.course_id = c.course_id;




// I Use Gpt in This 3 Conditions LOL

// Show all courses including those with no students (LEFT JOIN)
SELECT c.title, s.name
FROM courses c
LEFT JOIN student_courses sc ON c.course_id = sc.course_id
LEFT JOIN students s ON sc.student_id = s.student_id;

 
// Display all students including those not enrolled (RIGHT JOIN)
SELECT s.name, c.title
FROM student_courses sc
RIGHT JOIN students s ON sc.student_id = s.student_id
LEFT JOIN courses c ON sc.course_id = c.course_id;


// Find students born after 2000 enrolled in courses
SELECT s.name, s.birth_date, c.title
FROM students s
JOIN student_courses sc ON s.student_id = sc.student_id
JOIN courses c ON sc.course_id = c.course_id WHERE s.birth_date > '2000-01-01';