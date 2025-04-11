import { Box } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/")({
  component: Index,
});

function Index() {
  return <Box>hello</Box>;
}
