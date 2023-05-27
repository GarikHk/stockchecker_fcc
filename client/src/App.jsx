import { useState } from "react"

function App() {
    const [formData, setFormData] = useState({
        stock1: "",
        stock2: "",
        like: false,
    })
    
    const [display, setDisplay] = useState({
        single: false,
        double: false
    })

    function handleChange(event) {
        console.log(event.target.getAttribute("data-form"))
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function expandHandler(event) {
        const name = event.currentTarget.parentNode.className

        setDisplay(prev => ({
            [name]: !prev[name]
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        // submitToApi(formData)
        console.log(formData)
    }

    return (
        <div className="wrapper">
            <header className="header">
                <h1>Nasdaq Stock Price Checker</h1>
            </header>

            <main>
                <div className="single">
                    <div
                        className="singe-title"
                        onClick={expandHandler}
                    >
                        Get single price and total likes
                    </div>

                    <div className={`content ${!display.single ? "" : "expand"}`}>
                        <form className="formClass" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="stock1"
                                placeholder="GOOG"
                                required=""
                                onChange={handleChange}
                                value={formData.single.stock1}
                            />
                            <input
                                type="checkbox"
                                name="like"
                                onChange={handleChange}
                                checked={formData.single.like}
                            />

                            <button>Get Price!</button>
                        </form>
                    </div>

                </div>

                <div className="double">
                    <div
                        className="double-title"
                        onClick={expandHandler}
                    >
                        Compare and get relative likes
                    </div>

                    <div className={`content ${!display.double ? "" : "expand"}`}>
                        <form className="formClass" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="stock1"
                                placeholder="GOOG"
                                required=""
                                onChange={handleChange}
                                value={formData.double.stock1}
                            />
                            <input
                                type="text"
                                name="stock2"
                                placeholder="MSFT"
                                required=""
                                onChange={handleChange}
                                value={formData.double.stock2}
                            />
                            <input
                                type="checkbox"
                                name="like"
                                onChange={handleChange}
                                checked={formData.double.like}
                            />
                            <button>Get Price!</button>
                        </form>
                    </div>

                </div>

                {
                    // result && (
                    //     <>
                    //         <button
                    //             onClick={() => setDisplay(prev => !prev)}
                    //             className="jsonToggler"
                    //         >
                    //             {display ? "Hide JSON" : "See JSON"}
                    //         </button>

                    //         < div className={!display ? "jsonResult" : "jsonResult expand"}>
                    //             <code>{JSON.stringify(result, null, 2)}</code>
                    //         </div>
                    //     </>
                    // )
                }
            </main>
        </div>
    )
}

export default App
