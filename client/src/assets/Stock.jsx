import React, { useState } from "react"

export default function Stock({ title, component: Component, ...props }) {
    const [formData, setFormData] = useState({
        stock1: "",
        stock2: "",
        like: false,
    })
    const [display, setDisplay] = useState(false)
    const [json, setJson] = useState(false)
    const [result, setResult] = useState(null)

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const { stock1, stock2, like } = formData
        let apiUrl = `http://localhost:3000/api/stock-prices?like=${like}&stock=${stock1}`
        if (stock2) apiUrl += `&stock=${stock2}`

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => data.stockData ? setResult(data) : setResult({ error: "Invalid input" }))
            .catch(error => console.error(error))
    }

    function Result() {
        if (!result || !result.stockData) {
            return <h1>{result && result.error}</h1>;
        }

        const { stockData } = result;
        const text = !Array.isArray(stockData) ? (
            <h4>
                The current value of <span>{stockData.stock}</span> is{" "}
                <span>${stockData.price}</span> and has been liked{" "}
                <span>{stockData.likes}</span> time(s) on this website...
            </h4>
        ) : (
            <h4>
                The current value of <span>{stockData[0].stock}</span> is{" "}
                <span>${stockData[0].price}</span> and the current value of{" "}
                <span>{stockData[1].stock}</span> is <span>${stockData[1].price}</span>{" "}
                with a like difference of <span>{stockData[0].rel_likes}</span>...
            </h4>
        );

        return (
            <div className="result">
                {text}

                <button
                    onClick={() => setJson(prev => !prev)}
                    className="jsonToggler"
                >
                    {json ? "Hide JSON" : "See JSON"}
                </button>

                <div className={!json ? "jsonResult" : "jsonResult expand"}>
                    <pre>{JSON.stringify(stockData, null, 2)}</pre>
                </div>
            </div>
        );
    }

    return (
        <div className="stock">
            <div
                className="title"
                onClick={() => setDisplay(prev => !prev)}
            >
                {title}
            </div>

            <div className={`content ${!display ? "" : "expand"}`}>
                <div>
                    <Component
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        formData={formData}
                        setFormData={setFormData}
                        {...props}
                    />
                    <Result />
                </div>
            </div>

        </div>
    )
}