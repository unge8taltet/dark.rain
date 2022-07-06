window.addEventListener('DOMContentLoaded', () => {
    const dialogOpenBtn = document.querySelectorAll('.dialog-open')
    const dialogCloseBtn = document.querySelectorAll('.dialog-close')

    dialogOpenBtn.forEach(openBtn => {
        openBtn.addEventListener('click', () => {
            const dataDialogAttr = openBtn.getAttribute('data-dialog')

            if (dataDialogAttr) {
                const dialogEl = document.querySelector(dataDialogAttr)

                if (dialogEl) {
                    dialogEl.classList.add('dialog--open')
                    document.body.classList.add('is-lock')
                }
            }
        })
    })
    dialogCloseBtn.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const dataDialogAttr = closeBtn.getAttribute('data-dialog')

            if (dataDialogAttr) {
                const dialogEl = document.querySelector(dataDialogAttr)

                if (dialogEl) {
                    dialogEl.classList.remove('dialog--open')
                    document.body.classList.remove('is-lock')
                }
            }
        })
    })
})