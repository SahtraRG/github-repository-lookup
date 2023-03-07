import { Link } from "react-router-dom";

const Commits = ({ commitData, currentRepo }) => {
  return (
    <>
    <Link to='/repositories'>Back To Repositories</Link>
      <h1>Top 10 Most Recent Commits In "{currentRepo}"</h1>
      <ul id="commit-list">
        {commitData.map((commit) => {
          const created = new Date(commit.createdAt);
          return (
            <div className="commit-card" key={commit.hash}>
              <h2>{commit.title}</h2>
              <div className="card-section">
                <h4 className='card-label'>Author: </h4>
                <p>{commit.author}</p>
              </div>
              <div className="card-section">
                <h4 className='card-label'>Hash: </h4>
                <p>{commit.hash}</p>
              </div>
              
              <div className="card-section">
                <h4 className='card-label'>Created: </h4>
                <p>{created.toLocaleDateString("en-US")}</p>
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
};
export default Commits;
