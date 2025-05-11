import { useUpdateStoryStatus } from "@/api/story";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";

type Story = {
  id: string;
  title: string;
  thumbnail: string;
  shortDescription: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

type Props = {
  story: Story;
};

const StoryCard: React.FC<Props> = ({ story }) => {
  const {
    title,
    thumbnail,
    shortDescription,
    category,
    status,
    createdAt,
    user,
  } = story;

  const { mutate, isSuccess } = useUpdateStoryStatus();

  const [isOpen, { open, close }] = useDisclosure(false);
  const [data, setData] = useState({ storyId: "", status: "" });

  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: "Status Updated",
        message: "Story status updated successfully!",
        color: "green",
      });
    }
  }, [isSuccess]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Text fw={700} size="lg">
          {title}
        </Text>
        <Badge
          color={
            status === "PENDING"
              ? "yellow"
              : status === "APPROVED"
                ? "green"
                : "red"
          }
        >
          {status}
        </Badge>
      </Group>

      <Divider my="sm" />

      <Group align="flex-start" wrap="nowrap">
        <Image
          src={thumbnail}
          alt={title}
          h={160}
          w={160}
          fit="cover"
          radius="md"
        />
        <Stack gap="xs" style={{ flex: 1 }}>
          <Text size="sm">{shortDescription}</Text>
          <Badge variant="light" color="blue" size="sm" w="fit-content">
            {category}
          </Badge>
        </Stack>
      </Group>

      <Divider my="sm" />

      <Stack gap={0}>
        <Text size="sm" fw={500}>
          Posted by: {user.firstName} {user.lastName}
        </Text>
        <Text size="xs" c="dimmed">
          📧 {user.email}
        </Text>
        <Text size="xs" c="dimmed">
          🕒 {new Date(createdAt).toLocaleString()}
        </Text>
      </Stack>

      <Divider my="sm" />

      <Group>
        <Button
          onClick={() => {
            setData({ storyId: story.id, status: "APPROVED" });
            open();
          }}
          disabled={status === "APPROVED"}
        >
          Approve
        </Button>
        <Button
          variant="default"
          onClick={() => {
            setData({ storyId: story.id, status: "REJECTED" });
            open();
          }}
          disabled={status === "REJECTED"}
        >
          Reject
        </Button>
      </Group>

      <Modal
        opened={isOpen}
        onClose={close}
        title={`Update Status to (${data.status})`}
        centered
      >
        <Stack>
          <Text>Are you sure you want to change this story's status?</Text>
          <Group mt={20} justify="flex-end">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                mutate(data);
                close();
              }}
            >
              Yes, Update
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Card>
  );
};

export default StoryCard;
