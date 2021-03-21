import SingleBlogCard from "./SingleBlogCard"
import "../styles/BlogList.css"
import { useEffect, useState } from "react"
import Loading from "./Loading"

function BlogList() {
    const [blogs, setBlogs] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        fetch('https://ks-blogs.herokuapp.com/blogs')
            .then(response => response.json())
            .then(response => {
                setBlogs(response)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="bloglist">
            <div className="wrapper bloglist__wrapper">
                {isLoading ? <Loading /> : (
                    blogs ? blogs.map(item => <SingleBlogCard key={item._id} blog={item} />) : ''
                )}
            </div>
        </div>
    )
}

export default BlogList