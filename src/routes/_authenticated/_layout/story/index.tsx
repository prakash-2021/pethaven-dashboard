import { useGetAllStories } from "@/api/story";
import StoryCard from "@/components/StoryCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/story/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetAllStories();

  console.log(data);

  return (
    <div>
      {data?.stories?.map((story) => (
        <StoryCard story={story} key={story.id} />
      ))}
    </div>
  );
}
