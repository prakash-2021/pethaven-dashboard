import { useGetDashboard } from "@/api/dashboard";
import {
  Badge,
  Card,
  Grid,
  Group,
  Paper,
  Progress,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title, // Added for potential use
  useMantineTheme,
} from "@mantine/core";
import {
  IconCalendarMonth,
  IconCalendarWeek,
  IconChartBar,
  IconDog,
  IconFileText,
  IconPaw,
  IconUser,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/")({
  component: Index,
});

function Index() {
  const { data, isLoading } = useGetDashboard();
  const theme = useMantineTheme();

  const primaryStats = [
    {
      label: "Total Users",
      value: data?.data.totalUsers ?? 0,
      icon: IconUser,
      color: "blue",
    },
    {
      label: "Total Pets",
      value: data?.data.totalPets ?? 0,
      icon: IconPaw,
      color: "teal",
    },
    {
      label: "Total Adoptions",
      value: data?.data.totalAdoptedPets ?? 0,
      icon: IconDog,
      color: "green",
    },
    {
      label: "Total Stories",
      value: data?.data.totalStories ?? 0,
      icon: IconFileText,
      color: "grape",
    },
  ];

  const adoptionRate = data
    ? (data.data.totalAdoptedPets / (data.data.totalPets || 1)) * 100
    : 0;
  const totalPetsForAdoption = data?.data.totalPets ?? 0;
  const totalAdoptedPets = data?.data.totalAdoptedPets ?? 0;
  const weeklyAdoptedPets = data?.data.weeklyAdoptedPets ?? 0;
  const monthlyAdoptedPets = data?.data.monthlyAdoptedPets ?? 0;

  const totalStrayDogReports = data?.data.totalStrayDogReports ?? 0;
  const weeklyStrayDogReports = data?.data.weeklyStrayDogReports ?? 0;
  const monthlyStrayDogReports = data?.data.monthlyStrayDogReports ?? 0;

  // Helper to render loading or value
  const renderValue = (value: number | string) => (isLoading ? "..." : value);

  return (
    <Stack gap="xl">
      {/* Primary Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {primaryStats.map((stat) => (
          <Card key={stat.label} withBorder p="xl" radius="md" shadow="sm">
            <Group>
              <ThemeIcon
                color={stat.color}
                variant="light"
                size={58}
                radius="md"
              >
                <stat.icon size={32} stroke={1.5} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                  {stat.label}
                </Text>
                <Text fw={700} fz={28}>
                  {renderValue(stat.value)}
                </Text>
              </Stack>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Grid gutter="lg">
        {/* Adoption Performance Card */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="lg" radius="md" shadow="sm" h="100%">
            <Stack justify="space-between" h="100%">
              <Group justify="space-between" align="flex-start">
                <Stack gap={0}>
                  <Title order={4}>Adoption Performance</Title>
                  <Text size="sm" c="dimmed">
                    {renderValue(totalAdoptedPets)} adopted out of{" "}
                    {renderValue(totalPetsForAdoption)} total pets.
                  </Text>
                </Stack>
                <Badge
                  variant="filled"
                  size="lg"
                  color={
                    adoptionRate > 70
                      ? "green"
                      : adoptionRate > 40
                        ? "yellow"
                        : "red"
                  }
                >
                  {isLoading ? "..." : `${adoptionRate.toFixed(1)}% Rate`}
                </Badge>
              </Group>

              <Group grow align="center" my="md">
                <RingProgress
                  size={160}
                  thickness={12}
                  roundCaps
                  label={
                    <Text c="blue" fw={700} ta="center" size="xl" w={130}>
                      {isLoading ? "..." : `${adoptionRate.toFixed(1)}%`}
                    </Text>
                  }
                  sections={[
                    {
                      value: isLoading ? 0 : adoptionRate,
                      color: theme.colors.blue[6],
                      tooltip: `${adoptionRate.toFixed(1)}% Adopted`,
                    },
                  ]}
                />
                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    Key Figures:
                  </Text>
                  <Group>
                    <IconCalendarWeek
                      size={20}
                      stroke={1.5}
                      color={theme.colors.gray[6]}
                    />
                    <Text size="sm">
                      <Text component="span" fw={700}>
                        {renderValue(weeklyAdoptedPets)}
                      </Text>{" "}
                      Weekly Adoptions
                    </Text>
                  </Group>
                  <Group>
                    <IconCalendarMonth
                      size={20}
                      stroke={1.5}
                      color={theme.colors.gray[6]}
                    />
                    <Text size="sm">
                      <Text component="span" fw={700}>
                        {renderValue(monthlyAdoptedPets)}
                      </Text>{" "}
                      Monthly Adoptions
                    </Text>
                  </Group>
                  <Group>
                    <IconDog
                      size={20}
                      stroke={1.5}
                      color={theme.colors.green[6]}
                    />
                    <Text size="sm">
                      <Text component="span" fw={700}>
                        {renderValue(totalAdoptedPets)}
                      </Text>{" "}
                      Total Adoptions
                    </Text>
                  </Group>
                </Stack>
              </Group>
              {totalPetsForAdoption > 0 && !isLoading && (
                <Progress.Root size="lg" radius="sm">
                  <Progress.Section
                    value={adoptionRate}
                    color={theme.colors.blue[6]}
                  >
                    <Progress.Label>
                      {adoptionRate.toFixed(1)}% Adopted
                    </Progress.Label>
                  </Progress.Section>
                  <Progress.Section
                    value={100 - adoptionRate}
                    color={theme.colors.gray[3]}
                  >
                    <Progress.Label>
                      {(100 - adoptionRate).toFixed(1)}% Remaining
                    </Progress.Label>
                  </Progress.Section>
                </Progress.Root>
              )}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Stray Dog Reporting Card */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="lg" radius="md" shadow="sm" h="100%">
            <Stack justify="space-between" h="100%">
              <Group justify="space-between" align="flex-start">
                <Stack gap={0}>
                  <Title order={4}>Stray Dog Reporting</Title>
                  <Text size="sm" c="dimmed">
                    Overview of reported stray dogs.
                  </Text>
                </Stack>
                <Badge variant="filled" color="orange" size="lg">
                  {renderValue(totalStrayDogReports)} Total Reports
                </Badge>
              </Group>

              <Stack gap="xl" my="md" align="center">
                <ThemeIcon variant="light" color="orange" size={80} radius="xl">
                  <IconChartBar size={40} stroke={1.5} />
                </ThemeIcon>
                <Text fz={42} fw={700} c="orange">
                  {renderValue(totalStrayDogReports)}
                </Text>
                <Text c="dimmed" mt={-15} mb={10}>
                  Total Stray Reports
                </Text>
              </Stack>

              <SimpleGrid cols={2} spacing="md">
                <Paper
                  withBorder
                  p="sm"
                  radius="sm"
                  style={{ backgroundColor: theme.colors.orange[0] }}
                >
                  <Group>
                    <IconCalendarWeek
                      size={24}
                      stroke={1.5}
                      color={theme.colors.orange[7]}
                    />
                    <Stack gap={0}>
                      <Text size="xs" c="dimmed">
                        Weekly
                      </Text>
                      <Text fw={600}>{renderValue(weeklyStrayDogReports)}</Text>
                    </Stack>
                  </Group>
                </Paper>
                <Paper
                  withBorder
                  p="sm"
                  radius="sm"
                  style={{ backgroundColor: theme.colors.orange[0] }}
                >
                  <Group>
                    <IconCalendarMonth
                      size={24}
                      stroke={1.5}
                      color={theme.colors.orange[7]}
                    />
                    <Stack gap={0}>
                      <Text size="xs" c="dimmed">
                        Monthly
                      </Text>
                      <Text fw={600}>
                        {renderValue(monthlyStrayDogReports)}
                      </Text>
                    </Stack>
                  </Group>
                </Paper>
              </SimpleGrid>
              {/* Optional: Progress bar if there's a target or max capacity for reports */}
              {/*
              {totalStrayDogReports > 0 && !isLoading && (
                <Progress value={Math.min((totalStrayDogReports / 200) * 100, 100)} size="lg" color="orange" striped animated />
                // Assuming 200 is some kind of monthly target or capacity for example
              )}
              */}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* You can add more sections/charts here for other data like Stories, etc. */}
    </Stack>
  );
}
