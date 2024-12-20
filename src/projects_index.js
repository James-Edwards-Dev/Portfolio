async function fetchProjects() {
    try {
        const response = await fetch('public/projects.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const projects = await response.json();

        displayProjects(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

function displayProjects(projects){
    const projectsList = document.getElementById('projectList');
    projectsList.innerHTML= '';

    projects.forEach(project => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <h3>${project.Name}</h3>
                <a href=""><img scr="${project.Image}"></a>
            </div>
        `
        projectsList.appendChild(div);
    });
}

fetchProjects();