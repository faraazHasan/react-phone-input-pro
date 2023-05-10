import { useEffect, useRef, useState } from 'react'
import { ICountryList, ISelector } from '../types'
import { c } from '../data/countries'
import React from 'react'
import { onClickOutside } from '../utils/stylingMethods'
import Arrow from './Arrow'
import {
  DROPDOWN_PARENT_CLASS,
  DROPDOWN_BUTTON_CLASS,
  DROPDOWN_BUTTON_FOCUS_CLASS,
  DROPDOWN_BUTTON_TEXT_CLASS,
  DROPDOWN_ARROW_PARENT_CLASS,
  SELECTED_FLAG_CLASS,
  FLAG_CLASS,
  LIST_CLASS,
  LIST_ITEM_CLASS,
  LIST_ITEM_BUTTON_CLASS,
  DROPDOWN_INPUT_PARENT_CLASS,
  DROPDOWN_INPUT_CLASS,
  NO_OPTION_CLASS,
  DROPDOWN_TOP_CLASS,
  DROPDOWN_BUTTON_OFF_CLASS,
  FORM_FOCUS_CLASS,
  SHOW_CLASS,
} from '../utils/cssClassNames'

export const CountrySelector: React.FC<ISelector> = (props: ISelector) => {
  const selector = useRef<HTMLDivElement>()
  const [selectedOption, setSelectedOption] = useState<string>(
    props.flags === undefined || props.flags
      ? props.defaultCountry.fg
      : props.fullIsoCode
      ? props.defaultCountry.c
      : props.defaultCountry.c_sm,
  )
  const activeOption = useRef<number | undefined>()
  const shouldShowDrpDwn = useRef<boolean>(true)
  const drpBtn = useRef<HTMLButtonElement>()
  const selectorInput = useRef<HTMLInputElement>()
  const [search, setSearch] = useState('')
  const noOptions = useRef(false)
  useEffect(() => {
    if (selector.current && props.input && drpBtn.current) {
      onClickOutside(selector.current, props.input, drpBtn.current)
      props.drpButton(drpBtn.current)
      props.list(selector.current)
    }
  }, [props])

  const getSelector = () => {
    if (drpBtn.current) {
      const offset = drpBtn.current.getBoundingClientRect()
      if (offset.bottom > 500) {
        selector.current && shouldShowDrpDwn.current && selector.current.classList.add(DROPDOWN_TOP_CLASS)
      } else {
        selector.current && shouldShowDrpDwn.current && selector.current.classList.remove(DROPDOWN_TOP_CLASS)
      }
    }
    selector.current && shouldShowDrpDwn.current && selector.current.classList.toggle(SHOW_CLASS)
    props.input.classList.add(FORM_FOCUS_CLASS)
  }
  const menuStyle = props.onlyCountries
    ? props.onlyCountries.length < 5
      ? {
          height: 'auto',
        }
      : {}
    : {}

  const selectOption = (country: ICountryList, index: number) => {
    changeCountry(country['f'], country['d'], country['p'])
    setSelectedOption(
      props.flags === undefined || props.flags ? country['fg'] : props.fullIsoCode ? country['c'] : country['c_sm'],
    )
    activeOption.current = index
    selector.current && shouldShowDrpDwn.current && selector.current.classList.remove(SHOW_CLASS)
  }

  const countrySelectorStyle = { borderRadius: '4px 0px 0px 4px' }

  const changeCountry = async (format: string, code: string, placeholder: string) => {
    props.setFormat({
      format,
      placeholder,
    })
    props.mainInput?.focus()
    props.setCountryCode(code)
  }

  const countryOptions = (ar: ICountryList[]): ICountryList[] => {
    const options = props.onlyCountries
      ? ar.filter((country: ICountryList) => {
          const name = country['n'].toLocaleLowerCase()
          if (search) {
            return (
              (props.onlyCountries?.includes(country['c']) || props.onlyCountries?.includes(country['c_sm'])) &&
              name.startsWith(search)
            )
          } else {
            return props.onlyCountries?.includes(country['c']) || props.onlyCountries?.includes(country['c_sm'])
          }
        })
      : ar.filter((country: ICountryList) => {
          const name = country['n'].toLocaleLowerCase()
          if (search) {
            return name.startsWith(search)
          } else {
            return country
          }
        })
    shouldShowDrpDwn.current = (options.length && options.length > 1) || search ? true : false
    if (!shouldShowDrpDwn.current || props.disabled) {
      drpBtn.current && drpBtn.current.classList.add(DROPDOWN_BUTTON_OFF_CLASS)
    }
    noOptions.current = options.length ? false : true
    return options
  }

  return (
    <div className={DROPDOWN_PARENT_CLASS}>
      <button
        disabled={props.disabled}
        className={DROPDOWN_BUTTON_CLASS}
        ref={(ref: HTMLButtonElement) => (drpBtn.current = ref)}
        style={countrySelectorStyle}
        onClick={getSelector}
      >
        <div className={DROPDOWN_BUTTON_TEXT_CLASS}>
          {props.flags === undefined || props.flags ? (
            <img src={selectedOption} className={SELECTED_FLAG_CLASS} alt={selectedOption} />
          ) : (
            <p>{selectedOption}</p>
          )}
          {(props.onlyCountries &&
            props.onlyCountries.length < 2 &&
            (props.onlyCountries[0] === props.defaultCountry.c_sm ||
              props.onlyCountries[0] === props.defaultCountry.c)) ||
          props.disabled ? (
            ''
          ) : (
            <div className={DROPDOWN_ARROW_PARENT_CLASS}>
              <Arrow color={'rgb(108, 108, 108)'} />
            </div>
          )}
        </div>
      </button>
      <div style={menuStyle} ref={(ref: HTMLDivElement) => (selector.current = ref)} className={LIST_CLASS}>
        {(props.searchOption === undefined || props.searchOption) && (
          <div className={DROPDOWN_INPUT_PARENT_CLASS}>
            <input
              type='search'
              placeholder='Search...'
              ref={(ref: HTMLInputElement) => (selectorInput.current = ref)}
              className={DROPDOWN_INPUT_CLASS}
              onClick={() => {
                drpBtn.current && drpBtn.current.classList.add(DROPDOWN_BUTTON_FOCUS_CLASS)
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.currentTarget.value.toLocaleLowerCase())
              }}
            />
          </div>
        )}
        <div className={LIST_ITEM_CLASS}>
          <div>
            {countryOptions(c).map((country: ICountryList, index: number) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    selectOption(country, index)
                  }}
                  onTouchEnd={() => {
                    drpBtn.current && drpBtn.current.classList.add(DROPDOWN_BUTTON_FOCUS_CLASS)
                  }}
                  className={LIST_ITEM_BUTTON_CLASS}
                >
                  {props.flags === undefined || props.flags ? (
                    <img src={country['fg']} alt='' className={FLAG_CLASS} />
                  ) : (
                    ''
                  )}{' '}
                  {country['n']} {country['d']}
                </button>
              )
            })}
            {noOptions.current && <p className={NO_OPTION_CLASS}>No options</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
