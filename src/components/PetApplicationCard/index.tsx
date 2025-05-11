import { useUpdateApplication } from "@/api/application";
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

type Application = {
  applicationId: string;
  reason: string;
  hasPetExperience: string;
  homeType: string;
  hasOtherPets: string;
  status: string;
  submittedAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
  };
  pet: {
    name: string;
    species: string;
    breed: string;
    age: number;
    gender: string;
    size: string;
    color: string;
    healthStatus: string;
    images: string[];
  };
};

type Props = {
  application: Application;
};

const PetApplicationCard: React.FC<Props> = ({ application }) => {
  const {
    pet,
    user,
    status,
    submittedAt,
    reason,
    hasPetExperience,
    homeType,
    hasOtherPets,
  } = application;

  const { mutate, isSuccess } = useUpdateApplication();

  const [isOpen, { open, close }] = useDisclosure(false);
  const [id, setId] = useState({ id: "", status: "", petName: "", email: "" });

  useEffect(() => {
    if (isSuccess) {
      setId({ id: "", status: "", petName: "", email: "" });
      notifications.show({
        title: "Updated Successfully",
        message: "Application updated successfully!",
      });
    }
  }, [isSuccess]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Text fw={700} size="lg">
          Application Status
        </Text>
        <Badge
          color={
            status === "PENDING"
              ? "yellow"
              : status === "ACCEPTED"
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
          src={pet.images[0]}
          alt={pet.name}
          h={160}
          w={160}
          fit="cover"
          radius="md"
        />
        <Stack gap="xs" style={{ flex: 1 }}>
          <Text fw={500}>
            <strong>Pet:</strong> {pet.name} ({pet.breed}, {pet.age} yr,{" "}
            {pet.gender})
          </Text>
          <Text>
            <strong>Color:</strong> {pet.color}
          </Text>

          <Text size="sm" c="dimmed">
            {pet.healthStatus}
          </Text>
        </Stack>
      </Group>

      <Divider my="sm" />

      <Stack gap="xs">
        <Text fw={500}>Applicant Information</Text>
        <Text>
          {user.firstName} {user.lastName}
        </Text>
        <Text size="sm" c="dimmed">
          📧 {user.email} | 📞 {user.phoneNumber}
        </Text>
        <Text size="sm">
          🗓️ DOB: {new Date(user.dateOfBirth).toLocaleDateString()}
        </Text>
      </Stack>

      <Divider my="sm" />

      <Stack gap="xs" mb="sm">
        <Text fw={500}>Application Info</Text>
        <Text size="sm">Reason: {reason}</Text>
        <Text size="sm">Experience: {hasPetExperience}</Text>
        <Text size="sm">Home Type: {homeType}</Text>
        <Text size="sm">Other Pets: {hasOtherPets}</Text>
        <Text size="xs" c="dimmed">
          Submitted: {new Date(submittedAt).toLocaleString()}
        </Text>
      </Stack>

      <Group>
        <Button
          onClick={() => {
            setId({
              id: application.applicationId,
              status: "ACCEPTED",
              email: application.user.email,
              petName: application.pet.name,
            });
            open();
          }}
          disabled={application.status === "ACCEPTED"}
        >
          Accept
        </Button>
        <Button
          variant="default"
          onClick={() => {
            setId({
              id: application.applicationId,
              status: "REJECTED",
              email: application.user.email,
              petName: application.pet.name,
            });
            open();
          }}
          disabled={application.status === "REJECTED"}
        >
          Reject
        </Button>
      </Group>

      <Modal
        opened={isOpen}
        onClose={close}
        title={`Update Status to (${id.status})`}
        centered
      >
        <Stack>
          <Text>Are you sure you want to update the application status?</Text>
          <Group mt={20} justify="flex-end">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                mutate(id);
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

export default PetApplicationCard;
