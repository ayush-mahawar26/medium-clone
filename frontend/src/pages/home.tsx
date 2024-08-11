import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function HomePage() {

    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigator('/blogs')
        } else {
            navigator('/signup')
        }
    })

    return <div></div>
}