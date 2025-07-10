// Fake API function 
function fetchStudentData(studentId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (studentId > 0) {
                resolve(`Student #${studentId}: Ahmed Rabie (Age: ${23 + studentId})`);
            } else {
                reject("Invalid student ID.");
            }
        }, 1000);
    });
}

async function loadStudent(studentId) {
    const studentDiv = document.getElementById("studentData");
    studentDiv.textContent = "Loading...";

    try {
        const data = await fetchStudentData(studentId);
        studentDiv.textContent = data;
    } catch (error) {
        studentDiv.textContent = `Error: ${error}`;
    }
}

// Load multiple students
async function loadMultipleStudents(studentIds) {
    const multipleDiv = document.getElementById("multipleStudentData");
    multipleDiv.textContent = "Loading students...";

    try {
        const promises = studentIds.map(id => fetchStudentData(id));
        const results = await Promise.all(promises);
        multipleDiv.innerHTML = results.map(data => `<p>${data}</p>`).join('');
    } catch (error) {
        multipleDiv.textContent = `Error: ${error}`;
    }
}

document.getElementById("loadBtn").addEventListener("click", () => {
    loadStudent(1);
});

document.getElementById("loadMultipleBtn").addEventListener("click", () => {
    loadMultipleStudents([1, 2, 3]);
});
