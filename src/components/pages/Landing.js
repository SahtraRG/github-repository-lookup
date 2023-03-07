
import { Link } from "react-router-dom";

const Landing = ({searchQuery, setSearchQuery, getOrganizationRepos}) => {
  return (
    <div id="header-content">
        <h1>Github Repository Lookup 🔍</h1>
        <form className='search-bar'>
          <input
          id='search-input'
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Organizations"
          />
          <Link
            id="search-button"
            onClick={() =>
              searchQuery !== "" ? getOrganizationRepos(searchQuery) : undefined
            }
            to={`/repositories`}
          >
            🔎
          </Link>
        </form>
      </div>
  )
}
export default Landing