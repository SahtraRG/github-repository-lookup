import { Link } from "react-router-dom";

const Repositories = ({
  repositoryData,
  getRepositoryCommits,
  searchQuery,
  currentRepo
}) => {
  return (
    <>
    <h1>Repositories For "{searchQuery}"</h1>
    <ul id="grid">
      {repositoryData
        .sort((a, b) => b.stars - a.stars)
        .map((repo) => {
          const date = new Date(repo.createdDate);
          return (
            <div className='card' key={repo.name}>
              <h1>{repo.name}</h1>
              <h3>{repo.description}</h3>
              <div className="card-row">
                <div className="card-section">
                  <h4 className="card-label">Created At: </h4>
                  <p>
                    {date.toLocaleDateString("en-US")}
                  </p>
                </div>
                <div className="card-section">
                  <h4 className="card-label">Stars: </h4>
                  <p>{repo.stars}</p>
                </div>
                
              </div>

              <div className="card-row">
              <div className="card-section">
                  <h4 className="card-label">Language: </h4>{" "}
                  <p>{repo.language}</p>
                </div>
                <div className="card-section">
                  <h4 className="card-label">Forks: </h4>
                  <p>{repo.forks}</p>
                </div>
              </div>
              <Link
                onClick={() => getRepositoryCommits(searchQuery, repo.name)}
                to={`/commits`}
              >
                View Commits
              </Link>
            </div>
          );
        })}
    </ul>
    </>
  );
};
export default Repositories;
