export default async (req, res) => {
    const { sort } = req?.query;
    if(req.method === 'GET') {
        // @To Do: Move to config.
        const API_URL = `https://api.github.com/users/djuppi/repos?sort=${sort}`;

        const githubRes = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                Authorization: process.env.GITHUB_ACCESS_KEY
            }
        });
        const filteredRepos = [];

        const repos = await githubRes.json();
        
        if(githubRes.ok) {
            repos.forEach(repo => {


                const newName = (repo.name[0].toUpperCase() + repo.name.slice(1)).replaceAll('-', ' ').replace('frontend', '');
                const project = {};
                
                project.id = repo.id;
                project.name = newName;
                project.url = repo.url;
                project.description = repo.description;
                project.topics = repo.topics.filter(topic => topic !== 'onportfolio');
                project.homepage = repo.homepage;
                project.homepageImage = `https://raw.githubusercontent.com/djuppi/${repo.name}/master/public/images/homepage-thumb.png`;
                repo.topics.includes('onportfolio') && filteredRepos.push(project);
            });
            
            res.status(200).json({filteredRepos});
        } else {
            res.status(404).json({message: 'Not found'})
        }
        
    } else {
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
}