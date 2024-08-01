import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[]
    cryptoPrice: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>(
)(devtools( // Para devtools en chrome
    (set) => ({
        cryptoCurrencies: [],
        cryptoPrice: {} as CryptoPrice,
        loading: false,
        // https://min-api.cryptocompare.com/documentation?key=Toplists&cat=TopTotalMktCapEndpointFull
        fetchCryptos: async () => {
            const cryptoCurrencies = await getCryptos()
            set(() => ({
                cryptoCurrencies
            }))
        },
        fetchData: async (pair) => {
            set(() => ({
                loading: true
            }))
            const cryptoPrice = await fetchCurrentCryptoPrice(pair)
            set(() => ({
                cryptoPrice,
                loading: false
            }))
        }
    }))
) // Para devtools en chrome