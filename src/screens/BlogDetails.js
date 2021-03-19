import {
    useParams
} from "react-router-dom";

import Navbar from "../components/Navbar"
import blogs from "../data/blogs"
import "../styles/BlogDetails.css"

function BlogDetails() {
    const { id } = useParams()

    console.log(id)

    const blog = (blogs.filter(v => v.id === Number(id)))[0]
    console.log(blog)
    if(blog){
        return (
            <>
            <Navbar />
            <div className="blogDetails">
                <div className="blogDetails__thumbnail">
                    <img src={blog.thumbnail} alt=""/>
                </div>
                <div className="blogDetails__header">
                    <h1>{blog.title}</h1>
                    <p>{blog.shortDescription}</p>
                    <div className="blogDetails__metadata">
                        <div className="blogDetails__author_wrapper">
                            <img src="https://miro.medium.com/fit/c/376/282/1*yMzqAnPn-l1-P3-SuHg6fg.jpeg" alt=""/>
                            <div className="blogDetails__author_data">
                                <h4>By Moska Maaf</h4>
                                <span className="upload_date">17 September 2021</span>
                            </div>
                        </div>
                        <div className="blogDetails__categorys">
                            {blog && blog.categorys.map(category => (
                                <a href="#">{category}</a>
                            ))}
                        </div>
                    </div>
                    <div className="blogDetails__content"></div>
                </div>
            </div>
            </>
        )
    }else{
        return (
            <h1>404 Error</h1>
        )
    }
    
}

export default BlogDetails