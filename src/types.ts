export interface ICurrency {
    [key: string]: {
        name: string, 
        symbol: string
    }
}
export interface ICountryData { 
    officialName: string, 
    commonName?: string,
    capital?: string,
    currency: ICurrency, 
    flag: string
}