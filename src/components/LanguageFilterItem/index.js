// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLang, onClickActiveLanguageFilterItem, activeId} = props
  const {id, language} = eachLang
  const onClickChangeLanguageFilterItem = () => {
    onClickActiveLanguageFilterItem(id)
  }
  const active = activeId === id ? 'active' : ''
  return (
    <li className="language-item">
      <button
        className={`item-btn ${active}`}
        type="button"
        onClick={onClickChangeLanguageFilterItem}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
