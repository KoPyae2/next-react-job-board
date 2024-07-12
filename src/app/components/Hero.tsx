export default function Hero() {
    return (
        <section className="container my-16">
            <h1 className="text-4xl font-bold text-center">Find your next<br /> dream job</h1>
            {/* <p className="text-center text-gray-600 mt-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo modi possimus cum labore ipsum! Quaerat porro voluptates neque veniam, laboriosam, placeat vel minima soluta voluptas voluptatibus nesciunt error at quibusdam.
            </p> */}
            <form className="flex gap-2 mt-4 max-w-md mx-auto">
                <input
                    type="search"
                    className="border border-gray-400 w-full px-3 rounded-md"
                    placeholder="Search phrase..." />
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-md">Search</button>
            </form>
        </section>
    )
}