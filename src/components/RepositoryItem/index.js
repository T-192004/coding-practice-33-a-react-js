// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, starsCount, issuesCount, forksCount, name} = eachItem
  return (
    <li className="repository-item">
      <img className="repository-img" src={avatarUrl} alt={name} />
      <h1 className="repository-name">{name}</h1>
      <div className="icon-container">
        <img
          className="repository-icons"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="repository-icon-count">{starsCount} stars</p>
      </div>
      <div className="icon-container">
        <img
          className="repository-icons"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="repository-icon-count">{forksCount} forks</p>
      </div>
      <div className="icon-container">
        <img
          className="repository-icons"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="repository-icon-count">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
