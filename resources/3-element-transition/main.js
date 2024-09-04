window.addEventListener('pageswap', async (e) => {
  const initialImg = document.querySelector(`img`)
  initialImg.style.viewTransitionName = "img-transition"
  
  await e.viewTransition.finished

  initialImg.style.viewTransitionName = ""
})

window.addEventListener('pagereveal', async (e) => {
  const nextImg = document.querySelector(`img`)
  nextImg.style.viewTransitionName = "img-transition"
  
  await e.viewTransition.finished

  nextImg.style.viewTransitionName = ""
})
