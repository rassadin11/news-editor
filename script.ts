enum TITLES {
  H1 = 1,
  H2,
  H3 = 4,
  H4,
  H5,
  H6,
}

const mainText = document.querySelector('.main-field__text')

function buttonActions(
  element: HTMLButtonElement,
  firstScreen: string,
  secondScreen: string
): void {
  element.addEventListener('click', () => {
    const homeScreen: HTMLElement = document.querySelector(
      `[data-screen="${firstScreen}"]`
    )
    const screenHeaders: HTMLDivElement = document.querySelector(
      `[data-screen="${secondScreen}"]`
    )

    homeScreen.classList.add('d-none')
    screenHeaders.classList.remove('d-none')
  })
}

// ! style buttons

// for headers
const buttonHeaders: HTMLButtonElement = document.querySelector(
  '[data-action="headers"]'
)
const buttonHeadersBack: HTMLButtonElement = document.querySelector(
  '[data-action="header-back"]'
)

// for lists
const buttonLists: HTMLButtonElement = document.querySelector(
  '[data-action="lists"]'
)
const buttonListsBack: HTMLButtonElement = document.querySelector(
  '[data-action="list-back"]'
)

buttonActions(buttonHeaders, 'home-screen', 'headers')
buttonActions(buttonHeadersBack, 'headers', 'home-screen')

buttonActions(buttonLists, 'home-screen', 'ul-screen')
buttonActions(buttonListsBack, 'ul-screen', 'home-screen')

function resetButtons() {
  document
    .querySelector(`[data-screen="headers"]`)
    .classList.add('d-none')
  document
    .querySelector(`[data-screen="ul-screen"]`)
    .classList.add('d-none')
  document
    .querySelector(`[data-screen="home-screen"]`)
    .classList.remove('d-none')
}

// ! button actions
function generateTitle(
  button: HTMLButtonElement,
  title: string,
  titleSize: number
) {
  button.onclick = () => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return

    const range = sel.getRangeAt(0)
    if (range.collapsed) return

    // Находим исходный родительский div
    let parentDiv = range.startContainer
    parentDiv = parentDiv.parentNode
    if (!parentDiv) return

    // Получаем полный текст исходного div
    const fullText = parentDiv.textContent
    const nodeName: string = parentDiv.nodeName

    // Получаем текст до, внутри и после выделения
    const before = fullText.slice(0, range.startOffset)
    const selected = range.toString()
    const after = fullText.slice(range.startOffset + selected.length)

    // Создаём новые элементы
    const beforeDiv = before ? document.createElement(nodeName) : null
    if (beforeDiv) beforeDiv.textContent = before

    const wrapper = document.createElement(title)

    if (titleSize === 3) {
      wrapper.classList.add(`heading-style-4`)
    } else {
      wrapper.classList.add(`heading-style-${titleSize}`)
    }

    wrapper.classList.add('bold')
    wrapper.textContent = selected

    const afterDiv = after ? document.createElement(nodeName) : null
    if (afterDiv) afterDiv.textContent = after

    // Вставляем перед старым div
    const container = parentDiv.parentNode
    if (beforeDiv) container.insertBefore(beforeDiv, parentDiv)
    container.insertBefore(wrapper, parentDiv)
    if (afterDiv) container.insertBefore(afterDiv, parentDiv)

    // Удаляем исходный div
    container.removeChild(parentDiv)
    sel.removeAllRanges()
    resetButtons()
  }
}

function generateParagraph(button: HTMLButtonElement) {
  button.onclick = () => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return

    const range = sel.getRangeAt(0)
    if (range.collapsed) return

    // Находим исходный родительский div
    let parentDiv = range.startContainer
    parentDiv = parentDiv.parentNode
    if (!parentDiv) return

    // Получаем полный текст исходного div
    const fullText = parentDiv.textContent
    const nodeName: string = parentDiv.nodeName

    console.log(parentDiv.parentElement.nodeName)

    if (parentDiv.parentElement.nodeName === 'OL') {
      range.surroundContents(document.createElement('p'))
      return
    }

    // Получаем текст до, внутри и после выделения
    const before = fullText.slice(0, range.startOffset)
    const selected = range.toString()
    const after = fullText.slice(range.startOffset + selected.length)

    // Создаём новые элементы
    const beforeDiv = before ? document.createElement(nodeName) : null
    if (beforeDiv) beforeDiv.textContent = before

    const p = document.createElement('p')
    p.textContent = selected

    const afterDiv = after ? document.createElement(nodeName) : null
    if (afterDiv) afterDiv.textContent = after

    // Вставляем перед старым div
    const container = parentDiv.parentNode

    if (beforeDiv) container.insertBefore(beforeDiv, parentDiv)
    container.insertBefore(p, parentDiv)
    if (afterDiv) container.insertBefore(afterDiv, parentDiv)
    // Удаляем исходный div
    container.removeChild(parentDiv)

    sel.removeAllRanges()
  }
}

function generateMark(button: HTMLButtonElement) {
  button.addEventListener('click', () => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return

    const range: Range = sel.getRangeAt(0)
    if (range.collapsed) return

    let parentDiv = range.startContainer
    parentDiv = parentDiv.parentNode
    if (!parentDiv) return

    const selected = range.toString()
    if (range.endContainer === range.startContainer) {
      if (selected) {
        range.surroundContents(document.createElement('mark'))
      }
    } else {
      alert('Нельзя выделить mark в разных тегах')
    }

    sel.removeAllRanges()
    resetButtons()
  })
}

function generateStrong(button: HTMLButtonElement) {
  button.addEventListener('click', () => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return

    const range: Range = sel.getRangeAt(0)
    if (range.collapsed) return

    let parentDiv = range.startContainer
    parentDiv = parentDiv.parentNode
    if (!parentDiv) return

    const selected = range.toString()
    if (range.endContainer === range.startContainer) {
      if (selected) {
        range.surroundContents(document.createElement('strong'))
      }
    } else {
      alert('Нельзя выделить strong в разных тегах')
    }

    sel.removeAllRanges()
    resetButtons()
  })
}

function generateExample(button: HTMLButtonElement) {
  button.onclick = () => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return

    const range = sel.getRangeAt(0)
    if (range.collapsed) return

    // Находим исходный родительский div
    let parentDiv = range.startContainer
    parentDiv = parentDiv.parentNode
    if (!parentDiv) return

    // Получаем полный текст исходного div
    const fullText = parentDiv.textContent
    const nodeName: string = parentDiv.nodeName

    // Получаем текст до, внутри и после выделения
    const before = fullText.slice(0, range.startOffset)
    const selected = range.toString()
    const after = fullText.slice(range.startOffset + selected.length)

    const beforeDiv = before ? document.createElement(nodeName) : null
    if (beforeDiv) beforeDiv.textContent = before

    const p = document.createElement('div')
    p.classList.add('bg-gray')
    p.classList.add('p-4')
    p.classList.add('img-rounded')
    p.classList.add('my-5')

    p.textContent = selected

    const afterDiv = after ? document.createElement(nodeName) : null
    if (afterDiv) afterDiv.textContent = after

    const container = parentDiv.parentNode
    if (beforeDiv) container.insertBefore(beforeDiv, parentDiv)
    container.insertBefore(p, parentDiv)
    if (afterDiv) container.insertBefore(afterDiv, parentDiv)

    container.removeChild(parentDiv)
    sel.removeAllRanges()
  }
}

function generateList(button: HTMLButtonElement, type: 'ul' | 'ol') {
  button.addEventListener('click', () => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return

    const range = sel.getRangeAt(0)
    if (range.collapsed) return

    const ul = document.createElement(type)
    ul.classList.add('list')
    let elems: HTMLElement[] = []

    if (!sel.isCollapsed) {
      elems = getRangeSelectedNodes(sel.getRangeAt(0))
    }

    console.log(elems)
    elems = elems.filter(item => item.nodeName !== '#text')
    elems.forEach(item => {
      ul.insertAdjacentHTML('beforeend', `<li>${item.innerHTML}</li>`)
    })

    let insertElement: HTMLElement = elems[0]

    while (insertElement.parentElement.nodeName !== 'DIV') {
      insertElement = insertElement.parentElement
    }

    insertElement.insertAdjacentElement('beforebegin', ul)
    elems.forEach(item => item.remove())
    sel.removeAllRanges()
    resetButtons()
  })
}

// ! функция для выявления узлов внутри выделения
function getRangeSelectedNodes(range) {
  const startNode = range.startContainer
  const endNode = range.endContainer
  const commonAncestor = range.commonAncestorContainer

  const rangeNodes = []

  let node = commonAncestor.firstChild
  let inRange = false

  while (node) {
    if (node === startNode || node.contains(startNode)) {
      inRange = true
    }

    if (inRange) {
      rangeNodes.push(node)
    }

    if (node === endNode || node.contains(endNode)) {
      break
    }

    node = node.nextSibling
  }

  return rangeNodes
}

document.onselectionchange = function () {
  const selection: any = document.getSelection()
  const panel: HTMLDivElement = document.querySelector('.main-tools')
  console.log(selection.toString())

  if (selection.toString()) {
    const coords: DOMRect =
      selection.anchorNode.parentNode.getBoundingClientRect()

    console.log(coords)

    panel.style.top = coords.top - 50 + 'px'
    panel.style.left = coords.left + 'px'
    panel.style.display = 'block'
  } else {
    panel.style.display = 'none'
  }
}

// ! button elements

// header
const headersButtons = document.querySelectorAll(
  "[data-action*='header-']"
)

headersButtons.forEach((elem: HTMLButtonElement) => {
  const attribute = elem.dataset.action.replace('header-', '')

  if (+attribute) {
    generateTitle(elem, `h${attribute}`, +attribute)
  }
})

// paragraph
const paragraphButton: HTMLButtonElement = document.querySelector(
  '[data-action="paragraph"]'
)

generateParagraph(paragraphButton)

// mark
const markButton: HTMLButtonElement = document.querySelector(
  '[data-action="mark"]'
)

generateMark(markButton)

// strong
const strongButton: HTMLButtonElement = document.querySelector(
  '[data-action="strong"]'
)

generateStrong(strongButton)

// example block
const exampleButton: HTMLButtonElement = document.querySelector(
  '[data-action="example"]'
)

generateExample(exampleButton)

// unnumeric list
const unnumericListButton: HTMLButtonElement = document.querySelector(
  '[data-action="list-ul"]'
)

generateList(unnumericListButton, 'ul')

// numeric list
const unmericListButton: HTMLButtonElement = document.querySelector(
  '[data-action="list-ol"]'
)

generateList(unmericListButton, 'ol')

// * editor validation
const editor = document.getElementById('editor')

editor.addEventListener('input', () => {
  const sel = window.getSelection()

  if (
    editor.firstChild &&
    editor.firstChild.nodeType === Node.TEXT_NODE
  ) {
    const wrapper = document.createElement('p')
    wrapper.textContent = editor.firstChild.textContent
    editor.replaceChild(wrapper, editor.firstChild)

    // Переносим курсор в конец нового div
    const newRange = document.createRange()
    newRange.setStart(wrapper.firstChild, 1)
    newRange.collapse(true)

    sel.removeAllRanges()
    sel.addRange(newRange)
  }
})

type ULS_DIVIDER = {[name: string]: HTMLElement[]}

// ! validate code from google word

function validateP(item) {
  const span: HTMLElement[] = item.querySelectorAll('& > *')

  if (span.length === 2) {
    if (span[0].style.fontWeight === '700') {
      const p = document.createElement('p')
      const strong = document.createElement('strong')
      strong.innerHTML = span[0].innerHTML

      p.insertAdjacentHTML(
        'beforeend',
        `<strong>${span[0].innerHTML}</strong>${span[1].innerHTML}`
      )

      item.insertAdjacentElement('beforebegin', p)
      item.remove()
    }
  } else {
    let result = ''

    span.forEach(tag => {
      if (tag.nodeName === 'A') {
        const link = tag as HTMLLinkElement
        result += `<a href=${link.href}>${
          link.querySelector('span').innerHTML
        }</a>`
      }
      if (
        tag.style.fontSize === '11pt' &&
        tag.style.fontWeight === ''
      ) {
        result += tag.innerHTML
      }
    })

    const p = document.createElement('p')
    p.insertAdjacentHTML('beforeend', result)

    item.insertAdjacentElement('beforebegin', p)
    item.remove()
  }
}

function validateLi(item, obj: ULS_DIVIDER, ol_obj: ULS_DIVIDER) {
  const list = item.parentNode

  if (!list.id) return

  if (list.id.includes('ul')) {
    if (obj[list.id]) obj[list.id] = [...obj[list.id], item]
    else obj[list.id] = [item]
  } else {
    if (ol_obj[list.id]) ol_obj[list.id] = [...ol_obj[list.id], item]
    else ol_obj[list.id] = [item]
  }
}

function createNewLists(obj: ULS_DIVIDER, list: 'ul' | 'ol') {
  const keys = Object.keys(obj)

  keys.forEach(item => {
    const lis = obj[item]

    const old_ul = document.getElementById(item)
    if (!old_ul) return

    const new_ul = document.createElement(list)

    new_ul.classList.add('list')

    lis.forEach(elem => {
      new_ul.insertAdjacentHTML(
        'beforeend',
        `<li>${elem.innerHTML}</li>`
      )
    })

    old_ul.insertAdjacentElement('beforebegin', new_ul)
    old_ul.remove()
  })
}

function validateDiv(item) {
  // определяем линии
  const table = item.querySelector('table')
  console.log(table.querySelector('td').innerHTML)

  if (
    table.querySelectorAll('td').length === 1 &&
    table.querySelector('td').innerHTML === ''
  ) {
    const hr = document.createElement('hr')
    item.insertAdjacentElement('beforebegin', hr)
    item.remove()
  }
}

function validateTitle(item) {
  const title = item.nodeName
  const newTitle = document.createElement(title)

  if (title === TITLES.H3) {
    newTitle.classList.add('heading-style-4')
    newTitle.classList.add('bold')
  } else {
    newTitle.classList.add(`heading-style-${TITLES[title]}`)
    newTitle.classList.add('bold')
  }

  newTitle.innerHTML = item.querySelector('span').innerHTML
  item.insertAdjacentElement('beforebegin', newTitle)
  item.remove()
}

function validateText() {
  const elems = editor.querySelectorAll('[dir="ltr"]')

  const uls = editor.querySelectorAll('ul')
  const ols = editor.querySelectorAll('ol')

  uls.forEach((item, idx) => {
    item.id = `google-ul-${idx}`
  })

  ols.forEach((item, idx) => {
    item.id = `google-ol-${idx}`
  })

  let uls_divider: ULS_DIVIDER = {}
  let ols_divider: ULS_DIVIDER = {}

  const brs = editor.querySelectorAll('br')
  brs.forEach(item => item.remove())

  elems.forEach(item => {
    if (item.nodeName === 'P') validateP(item)
    else if (item.nodeName === 'LI')
      validateLi(item, uls_divider, ols_divider)
    else if (item.nodeName === 'DIV') validateDiv(item)
    else if (item.nodeName.indexOf('H') > -1) validateTitle(item)
  })

  createNewLists(uls_divider, 'ul')
  createNewLists(ols_divider, 'ol')
}

const googleButton: HTMLButtonElement = document.querySelector(
  '.main-field__button.google'
)

googleButton.addEventListener('click', validateText)

const copyHTML: HTMLButtonElement = document.querySelector(
  '.main-field__button.html'
)

copyHTML.addEventListener('click', () => {
  const html = editor.outerHTML // берём сам элемент с тегами

  navigator.clipboard
    .writeText(html)
    .then(() => {
      alert('HTML элемента скопирован в буфер обмена!')
    })
    .catch(err => {
      console.error('Ошибка копирования: ', err)
    })
})
