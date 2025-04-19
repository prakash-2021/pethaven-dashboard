import {
  Badge,
  Box,
  Card,
  Grid,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/")({
  component: Index,
});

function Index() {
  return (
    <Box>
      <Title order={2} mb="md">
        Dashboard
      </Title>

      {/* Stats Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md" mb="lg">
        <Card withBorder p="md">
          <Text size="xs" c="dimmed">
            Total Users
          </Text>
          <Text size="xl" fw={700}>
            1,245
          </Text>
        </Card>

        <Card withBorder p="md">
          <Text size="xs" c="dimmed">
            Active Sessions
          </Text>
          <Text size="xl" fw={700}>
            328
          </Text>
        </Card>

        <Card withBorder p="md">
          <Text size="xs" c="dimmed">
            Revenue (This Month)
          </Text>
          <Text size="xl" fw={700}>
            $12,560
          </Text>
        </Card>

        <Card withBorder p="md">
          <Text size="xs" c="dimmed">
            Pending Approvals
          </Text>
          <Text size="xl" fw={700}>
            16
          </Text>
        </Card>
      </SimpleGrid>

      {/* Progress Charts */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="sm">
              <Text fw={600}>User Growth</Text>
              <Badge color="green">+18%</Badge>
            </Group>
            <RingProgress
              roundCaps
              thickness={10}
              label={<Text size="sm">72% Growth</Text>}
              sections={[{ value: 72, color: "blue" }]}
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="sm">
              <Text fw={600}>System Usage</Text>
              <Badge color="orange">Stable</Badge>
            </Group>
            <RingProgress
              roundCaps
              thickness={10}
              label={<Text size="sm">54% Load</Text>}
              sections={[{ value: 54, color: "orange" }]}
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
