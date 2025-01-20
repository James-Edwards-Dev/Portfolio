document.addEventListener("DOMContentLoaded", () => {
    function getProjectFromUrl(){
        const params = new URLSearchParams(window.location.search);
        return params.get('project');
    }

    async function fetchHtmlAsText(url) {
        return await (await fetch(url)).text();
    }

    async function displayProjectDetails() {
        const projectName = getProjectFromUrl();
        if (projectName){
            const decodedProjectName = decodeURIComponent(projectName);
            const projects = await fetch('projects.json').then(response => response.json());
            const project = projects.find(proj => proj.Name === decodedProjectName);
            if (project){
                
                const project_info = document.getElementById('project_info');
                project_info.innerHTML = `
                    <h1>${project.Name}</h1>
                    <p>${project.Description}</p>
                `;

                const project_img = document.getElementById('project_image');
                if (!project.img_placeholder) {
                    project_img.src = "images/" + project.Image;
                }

                const project_video = document.getElementById('project_video');
                if (project.Video) {
                    project_video.innerHTML = `<source src="videos/${project.Video}">`;

                    // Add video title
                    const h2 = document.createElement('h2');
                    h2.innerHTML = `<h2>Check Out Some Gameplay!</h2>`;  

                    const video_container = document.getElementById('video_container');   
                    video_container.prepend(h2);              
                } else {
                    project_video.remove()
                }

                if (project.Page){
                    project_details = document.getElementById('project_details');
                    //project_details.innerHTML = project.Page;
                    project_details.innerHTML = await fetchHtmlAsText("pages/" + project.Page);
                }
            }
        }
    }

    displayProjectDetails();
});