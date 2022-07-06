import IMask from "imask";
import noUiSlider from "nouislider";

window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('apply-filter', (e) => {
        console.log(e.detail.filters())
    })


    const rangeField = document.querySelector('.dialog-filter__slide-price');
    const priceFrom = document.getElementById('price-from')
    const priceTo = document.getElementById('price-to')
    const min = 0, max = 200000, maskOpts = {
        mask: Number,
        min: min,
        max: max,
        thousandsSeparator: '.'
    }

    const priceFromMask = priceFrom ? IMask(priceFrom, maskOpts) : null
    const priceToMask = priceTo ? IMask(priceTo, maskOpts) : null

    const startSetFilterInputs = () => {
        const filters = getFilters()
        for (const filtersKey in filters) {
            if (filters.hasOwnProperty(filtersKey)) {
                const filterVal = filters[filtersKey]

                if (Array.isArray(filterVal)) {
                    filterVal.forEach(val => {
                        const el = document.querySelector(`input[name="${filtersKey}"][value="${val}"]`)
                        if (el)
                            el.checked = true
                    })
                }

                if (typeof filterVal == "boolean") {
                    const el = document.querySelector(`input[name="${filtersKey}"]`)
                    if (el)
                        el.checked = true
                }

                if (typeof filterVal == "string") {
                    const el = document.querySelector(`input[name="${filtersKey}"]`)
                    if (el) {
                        if (el.getAttribute('id') === "price-from" && rangeField) {
                            rangeField.noUiSlider.set([filterVal.replaceAll('.', ''), null])
                        } else if (el.getAttribute('id') === "price-to" && rangeField) {
                            rangeField.noUiSlider.set([null, filterVal.replaceAll('.', '')])
                        } else {
                            el.value = filterVal
                        }
                    }
                }
            }
        }
    }

    const addFilter = (key, value) => {
        const filters = localStorage.getItem('filters')
        if (!filters) localStorage.setItem('filters', JSON.stringify({}))
        const filtersParse = filters ? JSON.parse(filters) : {}
        filtersParse[key] = value
        localStorage.setItem('filters', JSON.stringify(filtersParse))
        document.dispatchEvent(filterApplyEvent)
    }
    const getFilter = (key) => {
        const filters = localStorage.getItem('filters')
        if (!filters) localStorage.setItem('filters', JSON.stringify({}))

        const filtersParse = filters ? JSON.parse(filters) : {}
        return filtersParse[key] || undefined
    }
    const getFilters = () => {
        const filters = localStorage.getItem('filters')
        if (!filters) localStorage.setItem('filters', JSON.stringify({}))

        return filters ? JSON.parse(filters) : {}
    }
    const clearFilter = () => {
        const filters = getFilters()

        for (const filtersKey in filters) {
            if (filters.hasOwnProperty(filtersKey)) {
                const filterVal = filters[filtersKey]

                if (Array.isArray(filterVal)) {
                    filterVal.forEach(val => {
                        const el = document.querySelector(`input[name="${filtersKey}"][value="${val}"]`)
                        if (el)
                            el.checked = false
                    })
                }

                if (typeof filterVal == "boolean") {
                    const el = document.querySelector(`input[name="${filtersKey}"]`)
                    if (el)
                        el.checked = false
                }

                if (typeof filterVal == "string") {
                    const el = document.querySelector(`input[name="${filtersKey}"]`)
                    if (el) {
                        if (el.getAttribute('id') === "price-from" && rangeField) {
                            rangeField.noUiSlider.set([min, null])
                        } else if (el.getAttribute('id') === "price-to" && rangeField) {
                            rangeField.noUiSlider.set([null, max])
                        } else {
                            el.value = ""
                        }
                    }
                }
            }
        }

        localStorage.setItem('filters', JSON.stringify({}))
        document.dispatchEvent(filterApplyEvent)
    }

    const filterApplyEvent = new CustomEvent('apply-filter', {
        detail: {
            filters: getFilters
        }
    })

    const checkboxArrayEvent = (e) => {
        const target = e.currentTarget
        const key = target.getAttribute('name')
        let filter = getFilter(key)

        if (!Array.isArray(filter))
            filter = []

        if (key) {
            if (target.checked) {
                if (!filter.find(f => f === target.value)) {
                    addFilter(key, [...filter, target.value])
                }
            } else {
                const newFilter = filter.filter(f => {
                    return f !== target.value;
                })

                addFilter(key, newFilter)
            }
        }
    }
    const toggleInputEvent = (e) => {
        const target = e.currentTarget
        const key = target.getAttribute('name')

        if (target.checked) {
            addFilter(key, target.checked)
        } else {
            addFilter(key, undefined)
        }
    }
    const inputValueEvent = (e) => {
        const target = e.currentTarget
        const key = target.getAttribute('name')

        if (key) {
            addFilter(key, target.value)
        }
    }

    const arrayFilterInp = document.querySelectorAll('.dialog-filter__array-filter')
    arrayFilterInp.forEach(el => {
        el.addEventListener('change', checkboxArrayEvent)
    })

    const valueFilterInp = document.querySelectorAll('.dialog-filter__value-filter')
    valueFilterInp.forEach(el => {
        el.addEventListener('change', inputValueEvent)
    })

    const toggleFilterInp = document.querySelectorAll('.dialog-filter__toggle-filter')
    toggleFilterInp.forEach(el => {
        el.addEventListener('change', toggleInputEvent)
    })

    const filterClear = document.querySelectorAll('.filter-clear')
    filterClear.forEach(el => {
        el.addEventListener('click', clearFilter)
    })


    if (rangeField) {
        const valEl = rangeField.parentElement.querySelector('.field-range-value')

        noUiSlider.create(rangeField, {
            start: [min, max],
            step: 1000,
            range: {
                'min': min,
                'max': max
            }
        });


        priceFrom.addEventListener('change', () => {
            rangeField.noUiSlider.set([priceFrom.value.replaceAll('.', ''), null]);
        })

        priceTo.addEventListener('change', () => {
            rangeField.noUiSlider.set([null, priceTo.value.replaceAll('.', '')]);
        })

        rangeField.noUiSlider.on('change', function (values) {
            const filters = localStorage.getItem('filters')
            if (!filters) localStorage.setItem('filters', JSON.stringify({}))
            const filtersParse = filters ? JSON.parse(filters) : {}
            filtersParse["priceFrom"] = priceFromMask.value
            filtersParse["priceTo"] = priceToMask.value

            localStorage.setItem('filters', JSON.stringify(filtersParse))
            document.dispatchEvent(filterApplyEvent)
        })

        rangeField.noUiSlider.on('update', function (values) {
            if (valEl) {
                const start = values[0] / 1000
                const end = values[1] / 1000

                const startText = start <= 0 ? start + " руб." : start + " тыс.руб."
                const endtText = end <= 0 ? end + " руб." : end + " тыс.руб."

                valEl.innerHTML = `<span>${startText}</span><span>${endtText}</span>`;

                priceFromMask.value = values[0].toString()
                priceToMask.value = values[1].toString()
            }
        });
    }


    const progress = document.querySelectorAll('.progress')
    const sort = document.querySelectorAll('.sort')
    const filters = document.querySelector('.filters')
    const filtersQ = document.getElementById('filters')
    const layoutGridBtn = document.getElementById('layout-grid')
    const layoutListBtn = document.getElementById('layout-list')
    const catalogProducts = document.querySelector('.catalog-products')

    if (catalogProducts) {
        const isGrid = localStorage.getItem('layout-catalog')

        if (isGrid) {
            catalogProducts.classList.add('catalog-products--grid')

            if (layoutGridBtn) {
                layoutGridBtn.classList.add('layout__item--active')

                if (layoutListBtn) {
                    layoutListBtn.classList.remove('layout__item--active')
                }
            }
        }
    }

    if (layoutGridBtn) {
        layoutGridBtn.addEventListener('click', () => {
            layoutGridBtn.classList.add('layout__item--active')

            localStorage.setItem('layout-catalog', "grid")

            if (catalogProducts) {
                catalogProducts.classList.add('catalog-products--grid')
            }
            if (layoutListBtn) {
                layoutListBtn.classList.remove('layout__item--active')
            }
        })
    }

    if (layoutListBtn) {
        layoutListBtn.addEventListener('click', () => {
            layoutListBtn.classList.add('layout__item--active')

            localStorage.removeItem('layout-catalog')

            if (catalogProducts) {
                catalogProducts.classList.remove('catalog-products--grid')
            }
            if (layoutGridBtn) {
                layoutGridBtn.classList.remove('layout__item--active')
            }
        })
    }

    if (filters && filtersQ) {
        let scrollPos = 0;
        const filtersCoords = 300

        window.addEventListener('scroll', (e) => {
            let st = window.scrollY;

            if (filtersCoords <= window.scrollY) {

                if (st > scrollPos) {
                    filters.classList.remove('filters--fixed')
                } else {
                    if (!filters.classList.contains('filters--fixed'))
                        filters.classList.add('filters--fixed')
                }

            } else {
                filters.classList.remove('filters--fixed')
            }

            scrollPos = st;
        })
    }

    progress.forEach(progressEl => {
        const max = progressEl.getAttribute('data-max')
        const span = progressEl.querySelector("span")
        const input = progressEl.querySelector("input")
        const value = input.value

        span.style.width = (value / max) * 100 + "%"
        input.addEventListener('change', () => {
            const val = input.value
            span.style.width = (val / max) * 100 + "%"
        })
    })

    sort.forEach(sortEl => {
        sortEl.addEventListener("click", (e) => {
            sortEl.classList.toggle("sort--active")
        })
    })


    startSetFilterInputs()
})