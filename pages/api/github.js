

export default async (req, res) => {
    if(req.method === 'GET') {
        // @To Do: Move to config.
        const API_URL = 'https://api.github.com/users/djuppi/repos';

        const githubRes = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                Authorization: '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'
            }
        });


        const filteredRepos = [];

        const repos = await githubRes.json();
        
        if(githubRes.ok) {
            repos.forEach(element => {

                
                const project = {};
                
                project.id = element.id;
                project.name = element.name;
                project.url = element.url;
                project.description = element.description;
                project.topics = element.topics;
                project.homepage = element.homepage;
                project.homepageImage = `https://raw.githubusercontent.com/djuppi/${element.name}/master/public/images/homepage-thumb.png`;
                filteredRepos.push(project);
            });
            
            res.status(200).json({filteredRepos});
        } else {
            res.status(404).json({message: 'Not found'})
        }
        
    } else {
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
}