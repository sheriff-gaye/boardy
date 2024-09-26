import Image from "next/image"

const EmptySearch=()=>{

    return(
        <div className="flex flex-col items-center justify-center h-full">
            <Image src="/empty-search.svg"  height={140} width={140} alt="empty"/>
            <h2 className="text-2xl font-semibold mt-6">No Result Found</h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try searching for something else or check your spelling.
            </p>

        </div>
    )
}

export default EmptySearch