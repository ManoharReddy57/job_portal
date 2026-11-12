
const currentUser = getCurrentUser();

if (!currentUser) {
    window.location.href = "login.html";
} else {

    document.getElementById("welcome").textContent =
        "Welcome, " + currentUser.name;

    const applications = getApplications().filter(
        app => app.userId === currentUser.id
    );

    const savedJobs = getSavedJobs().filter(
        item => item.userId === currentUser.id
    );

    document.getElementById("applicationCount").textContent =
        applications.length;

    document.getElementById("savedCount").textContent =
        savedJobs.length;

    document.getElementById("pendingCount").textContent =
        applications.filter(app => app.status === "Applied").length;


    // Display applications
    const applicationList =
        document.getElementById("applicationList");

    if (applications.length === 0) {

        applicationList.innerHTML =
            "<p class='empty-state'>You have not applied for any jobs yet.</p>";

    } else {

        applications.forEach(app => {

            const job = jobs.find(j => j.id === app.jobId);

            if (!job) return;

            const card = document.createElement("div");

            card.className = "dashboard-card";

            card.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.company}</p>
                <p>Location: ${job.location}</p>
                <p>Status: <strong>${app.status}</strong></p>
                <p>Applied: ${new Date(app.appliedAt).toLocaleDateString()}</p>
            `;

            applicationList.appendChild(card);
        });
    }


    // Display saved jobs
    const savedList = document.getElementById("savedList");

    if (savedJobs.length === 0) {

        savedList.innerHTML =
            "<p class='empty-state'>No saved jobs yet.</p>";

    } else {

        savedJobs.forEach(item => {

            const job = jobs.find(j => j.id === item.jobId);

            if (!job) return;

            const card = document.createElement("div");

            card.className = "job-card";

            card.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.company}</p>
                <p>${job.location}</p>
                <strong>${job.salary}</strong>
                <br><br>
                <button class="apply-btn"
                    onclick="window.location.href='job-details.html?id=${job.id}'">
                    View Job
                </button>

                <button class="apply-btn"
                    onclick="removeSavedJob(${job.id})">
                    Remove
                </button>
            `;

            savedList.appendChild(card);
        });
    }
}


// Remove saved job
function removeSavedJob(jobId) {

    const updated = getSavedJobs().filter(
        item => !(item.userId === currentUser.id &&
                  item.jobId === jobId)
    );

    localStorage.setItem("savedJobs", JSON.stringify(updated));

    window.location.reload();
}
