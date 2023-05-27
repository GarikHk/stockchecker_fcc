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
            <div>
                <div
                    className={!formData.like ? "like" : "liked"}
                    onClick={() => setFormData(prev => ({
                        ...prev,
                        like: !prev.like
                    }))}
                >{!formData.like ? "Like" : "Liked"}</div>

                <button>Get Price!</button>
            </div>
        </form>
    )
}