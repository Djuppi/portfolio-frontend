

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
            repos.forEach(element => {
                
                

                const newName = (element.name[0].toUpperCase() + element.name.slice(1)).replaceAll('-', ' ').replace('frontend', '');
                const project = {};
                
                project.id = element.id;
                project.name = newName;
                project.url = element.url;
                project.description = element.description;
                project.topics = element.topics;
                project.homepage = element.homepage;
                project.homepageImage = `https://raw.githubusercontent.com/djuppi/${element.name}/master/public/images/homepage-thumb.png`;
                project.readMe = `https://raw.githubusercontent.com/djuppi/${element.name}/master/README.md`;
                project.topics.includes('onportfolio') && filteredRepos.push(project);
            });
            
            res.status(200).json({filteredRepos});
        } else {
            res.status(404).json({message: 'Not found'})
        }
        
    } else {
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
}