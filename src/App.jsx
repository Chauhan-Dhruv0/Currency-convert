import { useState } from "react";
import  Box  from "./Componets/Box";
import UseCurrencyinfo from "./hooks/useCurrencyinfo";
import backgroundImage from "./assets/japan.jpg";

function App() {
    const [Amount, SetAmount] = useState();
    const [From, SetFrom] = useState("usd");
    const [To, SetTo] = useState("inr");
    const [ConvertAmount, SetConvertAmount] = useState(0);

    const CurrencyInfo = UseCurrencyinfo(From);
    const Option = CurrencyInfo ? Object.keys(CurrencyInfo) : [];

    const swap = () => {
        SetFrom(To);
        SetTo(From);
        SetConvertAmount(Amount);
        SetAmount(ConvertAmount);
    };

    const convert = () => {
        if (CurrencyInfo && CurrencyInfo[To]) {
            SetConvertAmount(Amount * CurrencyInfo[To]);
        } else {
            alert("Conversion rate not available for the selected currency.");
        }
    };

    return (
        <div
            className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <Box
                                label="From"
                                amount={Amount}
                                currencyOptions={Option}
                                onCurrencyChange={(currency) => SetFrom(currency)}
                                selectCurrency={From}
                                onAmountChange={(Amount) => SetAmount(Amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                Swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <Box
                                label="To"
                                amount={ConvertAmount}
                                currencyOptions={Option}
                                onCurrencyChange={(currency) => SetTo(currency)}
                                selectCurrency={To}
                                amountDisable
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                        >
                            Convert {From.toUpperCase()} to {To.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;




// git remote add origin https://github.com/Chauhan-Dhruv0/Currency-convert