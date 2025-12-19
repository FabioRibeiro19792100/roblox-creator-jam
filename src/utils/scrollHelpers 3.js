const defaultGetDocument = () =>
  typeof document !== 'undefined' ? document : null

const defaultGetWindow = () => (typeof window !== 'undefined' ? window : null)

export const scrollToElementById = (
  id,
  {
    offset = 0,
    behavior = 'smooth',
    getDocument = defaultGetDocument,
    getWindow = defaultGetWindow
  } = {}
) => {
  const doc = getDocument()
  const win = getWindow()
  if (!doc || !win || typeof win.scrollTo !== 'function') {
    return false
  }

  const element = doc.getElementById(id)
  if (!element) {
    return false
  }

  const elementPosition = element.getBoundingClientRect().top + win.pageYOffset
  const targetPosition = elementPosition - offset

  win.scrollTo({
    top: targetPosition,
    behavior
  })

  return true
}

export const scrollWindowTo = (
  options = {},
  { getWindow = defaultGetWindow } = {}
) => {
  const win = getWindow()
  if (!win || typeof win.scrollTo !== 'function') {
    return false
  }

  win.scrollTo(options)
  return true
}

export const updateHash = (
  hash,
  { replace = false, getWindow = defaultGetWindow } = {}
) => {
  const win = getWindow()
  if (!win) {
    return
  }

  if (replace && win.history && typeof win.history.replaceState === 'function') {
    const { pathname, search } = win.location
    win.history.replaceState(null, '', `${pathname}${search}${hash}`)
  } else {
    win.location.hash = hash
  }
}
