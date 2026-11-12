
const user = getCurrentUser();

if (!user) {
    window.location.href = "login.html";
} else {

    const users = getUsers();
    const fullUser = users.find(item => item.id === user.id);

    if (fullUser) {

        document.getElementById("profileName").value =
            fullUser.name || "";

        document.getElementById("profileEmail").value =
            fullUser.email || "";

        document.getElementById("profilePhone").value =
            fullUser.phone || "";

        document.getElementById("profileSkills").value =
            fullUser.skills || "";

        document.getElementById("profileExperience").value =
            fullUser.experience || "";
    }
}

document.getElementById("profileForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const users = getUsers();

    const index = users.findIndex(item => item.id === user.id);

    if (index === -1) return;

    users[index].name =
        document.getElementById("profileName").value.trim();

    users[index].phone =
        document.getElementById("profilePhone").value.trim();

    users[index].skills =
        document.getElementById("profileSkills").value.trim();

    users[index].experience =
        document.getElementById("profileExperience").value.trim();

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", JSON.stringify({
        id: users[index].id,
        name: users[index].name,
        email: users[index].email
    }));

    document.getElementById("profileMessage").textContent =
        "Profile updated successfully!";
});
