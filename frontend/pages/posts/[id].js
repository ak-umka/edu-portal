import Post from "@/components/Post/Post";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PostDescription from "@/components/Post/PostDescription";

function PostPage() {
  return (
    <div className="main">
      <Header />
      <PostDescription />
      <Post />
      <Footer />
    </div>
  );
}

export default PostPage;
