import React from 'react'
import { Outlet } from 'react-router-dom'

function CategoryLayout() {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default CategoryLayout
