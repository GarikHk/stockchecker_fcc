import React from "react"

export default function Single({ handleSubmit, handleChange, formData, setFormData }) {
    return (
        <form className="formClass" onSubmit={handleSubmit}>
            <input
                type="text"
                name="stock1"
                placeholder="GOOG"
                required
                onChange={handleChange}
                value={formData.stock1}
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