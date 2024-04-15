import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeId: 'ALL',
    repositoryList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getRepsitoryList()
  }

  getRepsitoryList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedFetchedData = fetchedData.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({
        repositoryList: updatedFetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickActiveLanguageFilterItem = id => {
    this.setState({activeId: id}, this.getRepsitoryList)
  }

  renderLanguageFiltersLsit = () => {
    const {activeId} = this.state
    return (
      <ul className="language-list">
        {languageFiltersData.map(eachLang => (
          <LanguageFilterItem
            eachLang={eachLang}
            key={eachLang.id}
            activeId={activeId}
            onClickActiveLanguageFilterItem={
              this.onClickActiveLanguageFilterItem
            }
          />
        ))}
      </ul>
    )
  }

  renderRespositorySuccess = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repository-list">
        {repositoryList.map(eachItem => (
          <RepositoryItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderRespositoryFailure = () => (
    <div className="respository-failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderRespositoryInProgress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryListItem = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRespositorySuccess()
      case apiStatusConstants.failure:
        return this.renderRespositoryFailure()
      case apiStatusConstants.inProgress:
        return this.renderRespositoryInProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        {this.renderLanguageFiltersLsit()}
        {this.renderRepositoryListItem()}
      </div>
    )
  }
}

export default GithubPopularRepos
