async function fetchProjects() {
    try {
        const response = await fetch('public/projects.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const projects = await response.json();

        alert("Projects Fetch is Working");
        //displayProjects(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

fetchProjects();