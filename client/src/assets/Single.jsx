import React from "react"

export default function Single({ handleSubmit, handleChange, formData, setFormData}) {
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