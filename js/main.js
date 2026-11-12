
const jobContainer = document.getElementById("jobContainer");

function displayJobs(jobList) {

    if (!jobContainer) return;

    jobContainer.innerHTML = "";

    if (jobList.length === 0) {
        jobContainer.innerHTML =
            "<p class='empty-state'>No jobs found.</p>";
        return;
    }

    jobList.slice(0, 6).forEach(job => {

        const card = document.createElement("div");

        card.className = "job-card";

        card.innerHTML = `
            <div class="company-icon">
                <i class="fa-solid fa-building"></i>
            </div>

            <span class="job-type">${job.type}</span>

            <h3>${job.title}</h3>

            <p class="company-name">${job.company}</p>

            <div class="job-meta">
                <span>
                    <i class="fa-solid fa-location-dot"></i>
                    ${job.location}
                </span>

                <span>
                    <i class="fa-solid fa-user"></i>
                    ${job.experience}
                </span>
            </div>

            <div class="job-footer">
                <strong>${job.salary}</strong>

                <button class="apply-btn"
                    onclick="viewJob(${job.id})">
                    View Details
                </button>
            </div>
        `;

        jobContainer.appendChild(card);
    });
}

function viewJob(id) {
    window.location.href =
        `pages/job-details.html?id=${id}`;
}

function searchJobs() {

    const keyword =
        document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const location =
        document.getElementById("locationInput")
        .value.toLowerCase();

    const results = jobs.filter(job => {

        const matchesKeyword =
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.category.toLowerCase().includes(keyword);

        const matchesLocation =
            !location ||
            job.location.toLowerCase() === location;

        return matchesKeyword && matchesLocation;
    });

    // Store search results for jobs page
    sessionStorage.setItem(
        "jobSearchResults",
        JSON.stringify(results)
    );

    window.location.href = "pages/jobs.html";
}

// Display featured jobs on homepage
displayJobs(jobs);
