
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
}

function getApplications() {
    return JSON.parse(localStorage.getItem("applications") || "[]");
}

function getSavedJobs() {
    return JSON.parse(localStorage.getItem("savedJobs") || "[]");
}


// Registration
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        const users = getUsers();

        if (users.some(user => user.email === email)) {
            document.getElementById("registerMessage").textContent =
                "Email already registered.";
            return;
        }

        users.push({
            id: Date.now(),
            name,
            email,
            password
        });

        localStorage.setItem("users", JSON.stringify(users));

        document.getElementById("registerMessage").textContent =
            "Registration successful! Please login.";

        registerForm.reset();
    });
}


// Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const users = getUsers();

        const user = users.find(
            item => item.email === email && item.password === password
        );

        if (!user) {
            document.getElementById("loginMessage").textContent =
                "Invalid email or password.";
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        }));

        window.location.href = "dashboard.html";
    });
}


// Apply for job
function applyForJob(jobId) {

    const user = getCurrentUser();

    if (!user) {
        alert("Please login before applying.");
        window.location.href = "login.html";
        return;
    }

    const applications = getApplications();

    const alreadyApplied = applications.some(
        app => app.userId === user.id && app.jobId === jobId
    );

    if (alreadyApplied) {
        alert("You already applied for this job.");
        return;
    }

    applications.push({
        id: Date.now(),
        userId: user.id,
        jobId: jobId,
        status: "Applied",
        appliedAt: new Date().toISOString()
    });

    localStorage.setItem("applications", JSON.stringify(applications));

    alert("Application submitted successfully!");
}


// Save job
function saveJob(jobId) {

    const user = getCurrentUser();

    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const savedJobs = getSavedJobs();

    const alreadySaved = savedJobs.some(
        item => item.userId === user.id && item.jobId === jobId
    );

    if (alreadySaved) {
        alert("Job already saved.");
        return;
    }

    savedJobs.push({
        userId: user.id,
        jobId: jobId
    });

    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

    alert("Job saved successfully!");
}


// Logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html";
}
