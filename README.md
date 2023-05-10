# react-phone-input-pro
Phone number input component for react to format phone numbers in real time.


## Features

* Easy to use - just import and use.
* Lightweight - No third-party dependencies.
* Search bar - You can anable or disable search bar from countries options list.
* You have option to include or exclude dial code from number.
* You can create your own formats

## Installation

Run this command in your terminal

```bash
npm add react-phone-input-pro
```


| Props | Description |
| --- | --- |
| initialFormat: Boolean | When using this component in editable forms. this function automatically guess the the dial code and formats the number|
| prefix: Boolean| user will get dial code pre defined When this is true or undefined |
| className: String | To add a css class in this component |
| includeDialingCode: Boolean | If you don't want to include dial code in number then make this false |
| placeholder: String | To change placeholder |
| onchange: Function() | This function returns current unformatted value. Which you can use to setState of value. |
| onlyCountries: Array | To filter country options. e.g.: ["USA", "IND"] |
| fixLength: Boolean | To limit input length |
| disabled: Boolean | To make input and selector disable|
| fullIsoCode: Boolean | Sets 3 letter ISO Code e.g. "IND", "USA"|
| searchOption: Boolean | To add or remove search bar|
| getCountryCode: Function() | To get selected country code |
| flags: Boolean | To get country code instead of flag |
| error: [errorStatus:boolean, errorMessage:string] | To show error message |

## Usage

```typescript
import PhoneInput from 'react-phone-input-pro';
```

```javascript
const [number, setNumber] = useState();
const [err, setErr] = useState(false);
```
```typescript
//for typescript
const [number, setNumber] = useState<string | number>();
 const [err, setErr] = useState(false);
```

## Example: Inside React-hook-form

### register method

#
```typescript
<PhoneInput 
  value={number}
  fullIsoCode={true} 
  {...register('number', { required: true }) }
/>
```
### controller method

#
```typescript
<Controller
control={control}
name="PhoneInput"
render={({ field: { onChange, value} }) => (
    <PhoneInput 
    value={number}
    initialFormat={true} 
    prefix={true} 
    fixLength={true}
    fullIsoCode={true} 
    searchOption={true}
    onchange={onChange}
/>
```

## Normal use

#
```typescript
<PhoneInput
  initialFormat={true} 
  value={number}
  prefix={true}
  onchange={(n) => setNumber(n)}
  fullIsoCode={true}
/> 
```

![Untitled](https://user-images.githubusercontent.com/83122437/235750981-6e157ab5-1eff-469f-bf47-6a3ea17df7ec.gif)


## Create your own format

#
```typescript
<PhoneInput 
   value={number}
   initialFormat={true} 
   prefix={true}
   placeholder={"Phone number..."}
   fixLength={true}
   format={"+100 #,##-(###)/##,##"}
   fullIsoCode={true}
   searchOption={true}
   onchange={(n)=> setPhone(n)} 
 />
 ```
![format](https://user-images.githubusercontent.com/83122437/235751030-968fcad7-0501-412e-b483-4640e29ae4f6.gif)


## Error handling
```typescript
<PhoneInput
  value={number}
  initialFormat={true}
  prefix={false}
  placeholder={"Phone number..."}
  error={[err, "Invalid Number"]}
  fullIsoCode={true} 
  searchOption={true}
  onchange={(value: string)=> {
    setNumber(value)
    setErr(false);
  }}
/> 
```
![Screen Recording 2023-05-06 at 8 35 22 PM](https://user-images.githubusercontent.com/83122437/236632539-43dfe372-557e-4f20-88c6-1f3a87a157dd.gif)
