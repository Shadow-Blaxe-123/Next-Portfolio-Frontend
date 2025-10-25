import BlogCard from "@/components/modules/Blogs/BlogCard";
import { FireflyBackground } from "@/components/modules/Blogs/Firefly";
import { Blog } from "@/interface";
import fetchData from "@/lib/fetchHelper";

async function page() {
  const data = await fetchData<Blog[]>(
    "https://next-portfolio-backend-zeta.vercel.app/api/v1/blogs/get-all",
    ["blogs"],
    "blogs"
  );

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Failed to load projects.</p>
      </div>
    );
  }

  return (
    <div className="text-center relative min-h-screen">
      <FireflyBackground />
      <div className="z-50">
        <h1 className="my-10 text-6xl font-semibold text-primary">My Blogs</h1>
        <div>
          <BlogCard data={data as Blog[]} />
        </div>
      </div>
    </div>
  );
}
export default page;
