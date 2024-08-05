export const COUNTRY_SEARCH_INPUT_PLACEHOLDER: string = 'Search for a country';

export const countrySearchUrl: string = 'https://restcountries.com/v3.1/name/'; 

export const WAIT_TIME = 500;

export  function debounce(func: Function, wait: number = 0): Function {
    let timeoutID: ReturnType<typeof setTimeout> | null = null;
  
    return function (this: any, ...args: any[]) {
      const context = this;
      clearTimeout(timeoutID ?? undefined);
  
      timeoutID = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }