document.addEventListener("DOMContentLoaded", () => {
    function getProjectFromUrl(){
        const params = new URLSearchParams(window.location.search);
        return params.get('project');
    }

    async function displayProjectDetails() {
        const projectName = getProjectFromUrl();
        if (projectName){
            const project_info = document.getElementById('project_info');
            project_info.innerHTML = `The project name is ${projectName}`;
        }
    }

    displayProjectDetails();
});