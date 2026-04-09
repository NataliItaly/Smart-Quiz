import { createElement } from '../utils/createElement'
import { StoredUser } from '../pages/login/types'
import { getStoredItem } from '../utils/getStoredItem'

export function renderHeader(): HTMLElement {
  const header = createElement({
    tag: 'header',
    className: 'header',
    id: 'header'
  })

  const user = getStoredItem<StoredUser>('currentUser')

  console.log(user)
  const userGreetings = createElement({
    tag: 'h2',
    className: 'header__greeting',
    id: 'header-greeting',
    text: `Wellcome ${user?.name ? user.name : ''}`
  })

  const goToStatBtn = createElement({
    tag: 'button',
    className: 'header__btn',
    id: 'stat-btn',
    text: 'Statistic'
  })

  const logoutBtn = createElement({
    tag: 'button',
    className: 'dashboard__btn',
    id: 'logout-btn',
    text: 'Log Out'
  })

  header.append(userGreetings, goToStatBtn, logoutBtn)

  return header
}
