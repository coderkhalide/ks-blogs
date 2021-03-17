import blogs from "../data/blogs"
import SingleBlogCard from "./SingleBlogCard"
import "../styles/BlogList.css"

function BlogList() {
    return (
        <div className="bloglist">
            <div className="wrapper bloglist__wrapper">
                {blogs && blogs.map(item => <SingleBlogCard key={item.id} blog={item} />)}
            </div>
        </div>
    )
}

export default BlogList