
const allJobs = document.getElementById("allJobs");

function renderAllJobs(list) {

    if (!allJobs) return;

    allJobs.innerHTML = "";

    document.getElementById("resultCount").textContent =
        `${list.length} Jobs Found`;

    if (!list.length) {
        allJobs.innerHTML =
            "<p class='empty-state'>No matching jobs found.</p>";
        return;
    }

    list.forEach(job => {

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
                <span>${job.location}</span>
                <span>${job.experience}</span>
            </div>

            <div class="job-footer">
                <strong>${job.salary}</strong>
                <button class="apply-btn"
                    onclick="viewJob(${job.id})">
                    Details
                </button>
            </div>
        `;

        allJobs.appendChild(card);
    });
}

function filterJobs() {

    const keyword =
        document.getElementById("jobSearch")
        .value.toLowerCase().trim();

    const location =
        document.getElementById("jobLocation")
        .value.toLowerCase();

    const category =
        document.getElementById("jobCategory")
        .value.toLowerCase();

    const filtered = jobs.filter(job => {

        return (
            (!keyword ||
                job.title.toLowerCase().includes(keyword) ||
                job.company.toLowerCase().includes(keyword)) &&

            (!location ||
                job.location.toLowerCase() === location) &&

            (!category ||
                job.category.toLowerCase() === category)
        );
    });

    renderAllJobs(filtered);
}

function viewJob(id) {
    window.location.href = `job-details.html?id=${id}`;
}

// Restore homepage search results, if available
const storedResults = sessionStorage.getItem("jobSearchResults");

if (storedResults !== null) {
    renderAllJobs(JSON.parse(storedResults));
    sessionStorage.removeItem("jobSearchResults");
} else {
    renderAllJobs(jobs);
}
