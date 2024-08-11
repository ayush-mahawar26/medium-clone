import { useParams } from "react-router-dom";
import { AppBar } from "../components/AppbarCompo";
import { useBlogById } from "../hooks/bloghook";
import { FullBlog } from "../components/Fullblog";

export function WholeBlog() {
    const { id } = useParams();

    return <div>
        <AppBar />
        <div>
            <FullBlog id={id!} />
        </div>
    </div>
}