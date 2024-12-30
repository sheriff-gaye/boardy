
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

    console.log("Test", randomImages);

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


export const remove = mutation({

  args: {
    id: v.id('board')
  },
  handler: async (ctx, args) => {

    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) {
      throw new Error("Unauthorized")
    }

    const userId = indentity.subject

    const existingFavorite = await ctx.db.query("userFavorites").withIndex("by_user_board", (q) => q
      .eq("userId", userId)
      .eq("boardId", args.id)).unique()

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    await ctx.db.delete(args.id)


  }
})


export const update = mutation({
  args: {
    id: v.id('board'),
    title: v.string()
  },
  handler: async (ctx, args) => {

    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) {
      throw new Error("Unauthorized")
    }

    const title = args.title.trim()
    if (!title) {
      throw new Error("Title is required")
    }
    if (title.length > 60) {
      throw new Error("Title is too long")
    }


    const board = await ctx.db.patch(args.id, {
      title: args.title
    })

    return board

  }
})


export const favorite = mutation({
  args: { id: v.id("board"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q
          .eq("userId", userId)
          .eq("boardId", board._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Board already favorited");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});


export const unfavorite = mutation({
  args: { id: v.id("board") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Favorited board not found");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
