// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { sort } = req?.query;
    if(req.method === 'GET') {
        // @To Do: Move to config.
        const API_URL = `https://api.github.com/user/repos?sort=${sort}`;

        const githubRes = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}` 
            }
        });
        const filteredRepos = [];

        const repos = await githubRes.json();
        
        if(githubRes.ok) {
            repos.forEach(repo => {


                const newName = (repo.name[0].toUpperCase() + repo.name.slice(1)).replaceAll('-', ' ').replace('frontend', '').trim();
                
                const project = {};
                
                project.id = repo.id;
                project.name = newName;
                project.url = repo.url;
                project.description = repo.description;
                project.topics = repo.topics.filter(topic => topic !== 'onportfolio');
                project.homepage = newName !== 'Mollenes' && repo.homepage;
                project.homepageImage = `https://raw.githubusercontent.com/djuppi/${repo.name}/master/public/images/homepage_small.png`;
                repo.topics.includes('onportfolio') && filteredRepos.push(project);
                project.isFinished = !repo.topics.includes('ongoing')
            });
            
            res.status(200).json({filteredRepos});
        } else {
            res.status(404).json({message: 'Not found'})
        }
        
    } else {
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
}