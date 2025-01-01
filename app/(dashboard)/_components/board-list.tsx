import { useQuery } from "convex/react";
import EmptyBoard from "./sidebar/empty-board";
import EmptyFavorites from "./sidebar/empty-favorites";
import EmptySearch from "./sidebar/empty-search";
import { api } from "@/convex/_generated/api";
import BoardCard from "./board-card";
import NewBoardButton from "./board-card/new-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.qet, { orgId , ...query});

  if (data===undefined) {
    return (
      <div>
        <h2 className="text-3xl text-black">
          {query.favorites ? "Favorites Boards" : "Team Boards"}
        </h2>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6  gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data.length && query.search) {
    return <EmptySearch />;
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data.length) {
    return <EmptyBoard />;
  }

  return (
    <div>
      <h2 className="text-3xl text-black">
        {query.favorites ? "Favorites Boards" : "Team Boards"}
      </h2>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6  gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} disabled={false} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            authorId={board.authorId}
            title={board.title}
            imageUrl={board?.imageUrl}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavories={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
