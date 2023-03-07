
import { Link, Navigate } from "react-router-dom";

const Landing = ({searchQuery, setSearchQuery, getOrganizationRepos}) => {

  const handleChange = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
    if(e.key === 'Enter') {
      getOrganizationRepos(searchQuery)
      return <Navigate to={'/repositories'} replace={true} />
    }
  }

  return (
    <div id="header-content">
        <h1>Github Repository Lookup 🔍</h1>
        <form className='search-bar'>
          <input
          id='search-input'
            onChange={handleChange}
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