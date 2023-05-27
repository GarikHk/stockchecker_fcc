import React from "react"

export default function Double({ handleSubmit, handleChange, formData, setFormData }) {
    return (
        <form className="formClass" onSubmit={handleSubmit}>
            <input
                type="text"
                name="stock1"
                placeholder="GOOG"
                required=""
                onChange={handleChange}
                value={formData.stock1}
            />
            <input
                type="text"
                name="stock2"
                placeholder="MSFT"
                required=""
                onChange={handleChange}
                value={formData.stock2}
            />
            <div className="buttons">
                <div
                    className="like"
                    onClick={() => setFormData(prev => ({
                        ...prev,
                        like: !prev.like
                    }))}
                ><p>{!formData.like ? "Like" : "Liked"}</p></div>

                <button>Get Price!</button>
            </div>
        </form>
    )
}