$('.nav-portfolio-container').ready(function() {    
    window.$ = document.querySelector.bind(document);
    window.$$ = document.querySelectorAll.bind(document);
    const allOptions = $$('.option')
    const options = $('.options')
    const bar = $('.bar')
    let focus = 0;
    allOptions.forEach((option, i) => {
      option.addEventListener('click', () => {
        if (focus !== i) {
          bar.className = 'bar';
          options.className = 'options';
          if (focus < i) {
            bar.classList.add('right')
          } else {
            bar.classList.add('left')
          }
          bar.classList.add(`index${i}`)
          options.classList.add(`index${i}`)
          focus = i;
        }
      })
    })
});