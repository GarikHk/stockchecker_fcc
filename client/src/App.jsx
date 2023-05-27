import Stock from "./assets/Stock"
import Single from "./assets/Single"
import Double from "./assets/Double"

function App() {
    return (
        <div className="wrapper">
            <header className="header">
                <h1>Nasdaq Stock Price Checker</h1>
            </header>

            <main>
                <Stock
                    title={"Get single price and total likes"}
                    component={Single} 
                />
                <Stock 
                    title={"Compare and get relative likes"} 
                    component={Double}
                />
            </main>
        </div>
    )
}

export default App