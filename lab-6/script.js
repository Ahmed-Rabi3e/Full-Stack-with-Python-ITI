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

// load students one by one
async function loadMultipleStudents(studentIds) {
    const multipleDiv = document.getElementById("multipleStudentData");
    multipleDiv.innerHTML = ""; 

    for (const id of studentIds) {
        multipleDiv.innerHTML += `<p>Loading student #${id}...</p>`;
        try {
            const data = await fetchStudentData(id);
            multipleDiv.innerHTML += `<p>${data}</p>`;
        } catch (error) {
            multipleDiv.innerHTML += `<p style="color:red;">Error: ${error}</p>`;
        }
    }
}

document.getElementById("loadBtn").addEventListener("click", () => {
    loadStudent(1);
});

document.getElementById("loadMultipleBtn").addEventListener("click", () => {
    loadMultipleStudents([1, 2, 3]);
});
