export function createExplainContainer(): HTMLElement {
  const container = document.createElement('div')
  container.id = 'explain-container'
  container.className = 'explain-container'
  container.classList.add('explain', 'hidden')
  const content = document.createElement('div')
  content.className = 'explain-content'

  const closeBtn = document.createElement('button')
  closeBtn.className = 'explain-close'
  closeBtn.textContent = '×'

  closeBtn.addEventListener('click', () => {
    container.classList.add('hidden')
  })

  content.appendChild(closeBtn)
  container.appendChild(content)

  return container
}

export function showExplain(text: string): void {
  const container = document.getElementById('explain-container') as HTMLDivElement
  if (!container) return

  const content = container.querySelector('.explain-content') as HTMLDivElement
  if (!content) return


  const textEl = document.createElement('div')
  textEl.className = 'explain-text'
  textEl.innerHTML = text


  content.querySelector('.explain-text')?.remove()
  content.appendChild(textEl)

  container.classList.remove('hidden')
}

// async function testBackend() {
//   const res = await fetch("/.netlify/functions/explain")
//   const data = await res.json()
//   console.log(data)
// }

// testBackend()

//