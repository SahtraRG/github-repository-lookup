import { Link } from "react-router-dom";

const Commits = ({ commitData, currentRepo }) => {
  return (
    <>
    <div className='header-and-btns'>
    <Link className='back-button' to='/repositories'> Back To Repositories</Link>
    <Link className='back-button' to='/'>Back To Search</Link>
    </div>
      <h1>Top 10 Most Recent Commits In "{currentRepo}"</h1>
      <ul id="commit-list">
        {commitData.map((commit) => {
          const createdAt = new Date(commit.createdAt);
          return (
            <div className="commit-card" key={commit.hash}>
              <h2>{commit.title}</h2>
              <div className="card-section">
                <h4 className='card-label'>Commit Author: </h4>
                <p>{commit.author}</p>
              </div>
              <div className="card-section">
                <h4 className='card-label'>Commit Hash: </h4>
                <p>{commit.hash}</p>
              </div>
              
              <div className="card-section">
                <h4 className='card-label'>Created At: </h4>
                <p>{createdAt.toLocaleDateString("en-US")}</p>
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
};
export default Commits;
