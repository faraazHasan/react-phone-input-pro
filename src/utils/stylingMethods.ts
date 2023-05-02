import {
  LIST_ITEM_BUTTON_CLASS,
  FORM_FOCUS_CLASS,
  DROPDOWN_BUTTON_FOCUS_CLASS,
  DROPDOWN_SEARCH_OFF_CLASS,
  DROPDOWN_BUTTON_CLASS,
  DROPDOWN_INPUT_CLASS,
  PHONE_INPUT_CLASS,
  SHOW_CLASS,
} from './cssClassNames'

export const onClickOutside = (selector: HTMLDivElement, input: HTMLInputElement, drpButton: HTMLButtonElement) => {
  window.onclick = function (event: MouseEvent | TouchEvent) {
    if (
      event.target &&
      (event.target as HTMLButtonElement).className !== DROPDOWN_BUTTON_CLASS &&
      event.target &&
      (event.target as HTMLButtonElement).className !== DROPDOWN_INPUT_CLASS &&
      event.target &&
      (event.target as HTMLButtonElement).className !== DROPDOWN_SEARCH_OFF_CLASS &&
      event.target &&
      (event.target as HTMLButtonElement).className !== LIST_ITEM_BUTTON_CLASS &&
      event.target &&
      (event.target as HTMLButtonElement).className !== PHONE_INPUT_CLASS
    ) {
      selector.classList.remove(SHOW_CLASS)
      input.classList.remove(FORM_FOCUS_CLASS)
      drpButton.classList.remove(DROPDOWN_BUTTON_FOCUS_CLASS)
    }
  }
  window.ontouchstart = function (event: TouchEvent) {
    if (
      event.target &&
      (event.target as HTMLDivElement).className !== LIST_ITEM_BUTTON_CLASS &&
      event.target &&
      (event.target as HTMLButtonElement).className !== DROPDOWN_BUTTON_CLASS &&
      event.target &&
      (event.target as HTMLButtonElement).className !== DROPDOWN_INPUT_CLASS &&
      event.target &&
      (event.target as HTMLButtonElement).className !== PHONE_INPUT_CLASS &&
      event.target &&
      (event.target as HTMLButtonElement).className !== DROPDOWN_SEARCH_OFF_CLASS &&
      event.target &&
      (event.target as HTMLButtonElement).className !== LIST_ITEM_BUTTON_CLASS &&
      (event.target as HTMLDivElement).className !== DROPDOWN_SEARCH_OFF_CLASS
    ) {
      selector.classList.remove(SHOW_CLASS)
      input.classList.remove(FORM_FOCUS_CLASS)
      drpButton.classList.remove(DROPDOWN_BUTTON_FOCUS_CLASS)
    }
  }
}

export const onInputFocus = (
  inputElm: HTMLInputElement,
  parent: HTMLDivElement,
  drpButton?: HTMLButtonElement,
  list?: HTMLDivElement,
) => {
  inputElm.addEventListener('focus', () => {
    parent.classList.add(FORM_FOCUS_CLASS)
    drpButton && drpButton.classList.add(DROPDOWN_BUTTON_FOCUS_CLASS)
    list && list.classList.remove(SHOW_CLASS)
  })

  inputElm.addEventListener('focusout', () => {
    parent.classList.remove(FORM_FOCUS_CLASS)
    drpButton && drpButton.classList.remove(DROPDOWN_BUTTON_FOCUS_CLASS)
  })
}
