// Function to assign grade
function getGrade(score) {
  if (score >= 90 && score <= 100) return 'A';
  else if (score >= 80) return 'B';
  else if (score >= 70) return 'C';
  else if (score >= 60) return 'D';
  else return 'F'; // Fail
}

// Function to check pass/fail
function checkPass(score) {
  return score >= 60 ? "Pass" : "Fail";
}

// Array of student objects
const students = [
  { name: "Ahmed", score: 95 },
  { name: "Laila", score: 72 },
  { name: "Youssef", score: 58 },
];

// Loop through each student and evaluate
students.forEach((student, index) => {
  const grade = getGrade(student.score);
  const result = checkPass(student.score);

  console.log(`\nStudent ${index + 1}`);
  console.log("-------------");
  console.log(`Name  : ${student.name}`);
  console.log(`Score : ${student.score}`);
  console.log(`Grade : ${grade}`);
  console.log(`Result: ${result}`);
});
