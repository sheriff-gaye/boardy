
import { mutation } from "./_generated/server";
import { v } from "convex/values";




const images = [
    "/placeholder/1.svg",
    "/placeholder/2.svg",
    "/placeholder/3.svg",
    "/placeholder/4.svg",
    "/placeholder/5.svg",
    "/placeholder/6.svg",
    "/placeholder/7.svg",
    "/placeholder/8.svg",
    "/placeholder/9.svg",
    "/placeholder/10.svg"
]
export const create = mutation({
    args: {
        title: v.string(),
        orgId: v.string()
    },

    handler: async (ctx, args) => {

        const indentity = await ctx.auth.getUserIdentity();

        if (!indentity) {
            throw new Error("Unauthorized")
        }

        const randomImages = images[Math.floor(Math.random() * images.length)]

        const board = await ctx.db.insert("board", {
            title: args.title,
            orgId: args.orgId,
            authorId: indentity.subject,
            authorName: indentity.name!,
            imageUrl: randomImages
        }
        )


        return board


    }
})