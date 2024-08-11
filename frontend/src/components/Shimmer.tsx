export function ShimmerEffectBlog() {
    return <div role="status" className="w-[50%] animate-pulse">

        <div className="border-b-2 w-[100%] pt-3 hover:cursor-pointer px-4">
            <div className="flex items-center">
                <div className="h-5 bg-gray-200 rounded-full w-5 mb-4 mr-4"></div>

                <div className="h-2.5 bg-gray-200 rounded-full w-20 mb-4 mr-3"></div>

                <div className="h-1 bg-gray-200 rounded-full w-1 mb-4 mr-4"></div>

                <div className="h-2.5 bg-gray-200 rounded-full w-20 mb-4"></div>

            </div>
            <div>
                <div className="h-2.5 bg-gray-200 rounded-full w-full mb-4"></div>

                <div className="h-2.5 bg-gray-200 rounded-full w-full mb-4"></div>

            </div>
            <div className="h-2.5 bg-gray-200 rounded-full w-full mb-4"></div>

        </div>

    </div>
}