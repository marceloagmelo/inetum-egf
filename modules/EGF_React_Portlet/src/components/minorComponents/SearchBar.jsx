import React, { useState } from "react";



export default function SearchBar({ placeholder, searchBarListener }) {

    return (
            <div className="form-group has-search">
                <span className="bi bi-search"></span>
                <input className="form-control" type="text" placeholder={placeholder} onChange={searchBarListener} />
            </div>
    )

}