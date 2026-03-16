

let disableUnloadWarning: null | (() => void) = null
let disableFocusWarning: null | (() => void) = null


function enableLeaveWarning() {
  const handler = (event: BeforeUnloadEvent) => {
    event.preventDefault()
    event.returnValue = ''
  }
  window.addEventListener('beforeunload', handler)
  return () => window.removeEventListener('beforeunload', handler)
}

function setupFocusWarning(show: () => void) {
  const handler = () => {
    if (document.hidden) {
  
      show()

    } else {
 
    }
  }
  document.addEventListener('visibilitychange', handler)
  return () => document.removeEventListener('visibilitychange', handler)
}

export function initQuizProtection(show: () => void) {
  disableUnloadWarning = enableLeaveWarning()
  disableFocusWarning = setupFocusWarning(show)
}

export function cleanupQuizProtection() {
  if (disableUnloadWarning) disableUnloadWarning()
  if (disableFocusWarning) disableFocusWarning()
}

