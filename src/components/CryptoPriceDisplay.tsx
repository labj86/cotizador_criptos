import { useCryptoStore } from "../store"
import Spinner from "./Spinner"

export default function CryptoPriceDisplay() {

    const { loading, cryptoPrice } = useCryptoStore()
    //const hasResult = useMemo(() => Object.values(cryptoPrice).includes(''), [cryptoPrice])

    return (
        <div className="result-wrapper">
            {loading ?
                <Spinner /> :
                Object.values(cryptoPrice).length > 0 && (
                    <>
                        <h2>Cotización</h2>
                        <div className="result">
                            <img
                                src={`https://cryptocompare.com/${cryptoPrice.IMAGEURL}`}
                                alt="Imagen Cryptomoneda"
                            />
                            <div>
                                <p>El precio es de: <span>{cryptoPrice.PRICE}</span></p>
                                <p>El precio más alto del día: <span>{cryptoPrice.HIGHDAY}</span></p>
                                <p>El precio más bajo del día: <span>{cryptoPrice.LOWDAY}</span></p>
                                <p>Variación últimas 24 horas: <span>{cryptoPrice.CHANGEPCT24HOUR}</span></p>
                                <p>Última actualización: <span>{cryptoPrice.LASTUPDATE}</span></p>
                            </div>
                        </div>
                    </>
                )}
        </div>
    )
}