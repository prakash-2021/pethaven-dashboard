import { useGetAllApplication } from "@/api/application";
import PetApplicationCard from "@/components/PetApplicationCard";
import { Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/pet-request/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetAllApplication();

  return (
    <Stack>
      {data?.map(
        ({
          pet,
          user,
          status,
          submittedAt,
          reason,
          hasPetExperience,
          homeType,
          hasOtherPets,
          applicationId,
        }) => (
          <PetApplicationCard
            application={{
              applicationId,
              hasOtherPets,
              hasPetExperience,
              homeType,
              pet,
              reason,
              status,
              submittedAt,
              user,
            }}
          />
        )
      )}
    </Stack>
  );
}
