import { useLocation, useParams } from "react-router-dom";
import edjsParser from "editorjs-parser"
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar"
import "../styles/BlogDetails.css"
import Loading from "../components/Loading";

function BlogDetails() {
    const { id } = useParams()
    const location = useLocation()
    const [htmlTemplate, setHtmlTemplate] = useState(null)
    const [blog, setBlog] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const config = {
        image: {
            use: "figure",
            // use figure or img tag for images (figcaption will be used for caption of figure)
            // if you use figure, caption will be visible
            imgClass: "img", // used class for img tags
            figureClass: "fig-img", // used class for figure tags
            figCapClass: "fig-cap", // used class for figcaption tags
            path: "absolute",
            // if absolute is passed, the url property which is the absolute path to the image will be used
            // otherwise pass a relative path with the filename property in <> like so: '/img/<fileName>'
        },
        paragraph: {
            pClass: "paragraph", // used class for paragraph tags
        },
        code: {
            codeBlockClass: "code-block", // used class for code blocks
        },
        embed: {
            useProvidedLength: false,
            // set to true if you want the returned width and height of editorjs to be applied
            // NOTE: sometimes source site overrides the lengths so it does not work 100%
        },
        quote: {
            applyAlignment: false,
            // if set to true blockquote element will have text-align css property set
        },
    };

    const customParsers = {
        simpleImage: function (data) {
            return `<img src="${data.url}" alt="${data.caption}" >`;
        },
        embed: function (data) {
            return `<iframe src="${data.embed}" width="100%" height="500px"></iframe>`;
        },
        code: function (data) {
            return `<pre class="codeBlock language-javascript"><code class="code">${data.code}</code></pre>`;
        },
        delimiter: function () {
            return `<div class="ce-block__content"><div class="ce-delimiter cdx-block"></div></div>`
        }
    }

    const parser = new edjsParser(config, customParsers);

    useEffect(() => {
        if (location.state) {
            setBlog(location.state.blog)
            setHtmlTemplate(parser.parse(location.state.blog))
            setIsLoading(false)
        } else {
            fetch('https://ks-blogs.herokuapp.com/blogs/' + id)
                .then(response => response.json())
                .then(response => {
                    setBlog(response)
                    setHtmlTemplate(parser.parse(response))
                    setIsLoading(false)
                })
                .catch(error => console.log(error))
        }
    }, [location.state, id])

    function createMarkup() {
        return { __html: htmlTemplate };
    }

    return (
        <>
            <Navbar />
            <div className="blogDetails">
                {isLoading ? <Loading /> : (
                    <>
                        <div className="blogDetails__thumbnail">
                            <img src={blog.thumbnail} alt="" />
                        </div>
                        <div className="blogDetails__header">
                            <h1>{blog.title}</h1>
                            {/* <p>{blog.shortDescription}</p> */}
                            <div className="blogDetails__metadata">
                                <div className="blogDetails__author_wrapper">
                                    <img src={blog.user.avatar} alt="" />
                                    <div className="blogDetails__author_data">
                                        <h4>{blog.user.name}</h4>
                                        <span className="upload_date">17 September 2021</span>
                                    </div>
                                </div>
                                <div className="blogDetails__categorys">
                                    {blog && blog.categorys.map(category => (
                                        <a href="/">{category}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="blogDetails__content" dangerouslySetInnerHTML={createMarkup()}></div>
                    </>
                )}
            </div>
        </>
    )

}

export default BlogDetails