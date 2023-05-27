import React, { useState } from "react"
import Single from "./Single"

export default function Stock({ title, component: Component, ...props }) {
    const [formData, setFormData] = useState({
        stock1: "",
        stock2: "",
        like: false,
    })

    const [display, setDisplay] = useState(false)

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
        // submitToApi(formData)
        console.log(formData)
    }

    // console.log(Component)

    return (
        <div className={`stock`}>
            <div
                className="title"
                onClick={() => setDisplay(prev => !prev)}
            >
                {title}
            </div>

            <div className={`content ${!display ? "" : "expand"}`}>
                <Component
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                    {...props}
                />
            </div>

        </div>
    )
}