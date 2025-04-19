import { useDeletePet, useGetPetById, useUpdatePet } from "@/api/pet";
import { Pet } from "@/types/pet";
import {
  Button,
  Container,
  FileInput,
  Group,
  Image,
  Loader,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/_layout/pet/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: Route.id });

  const [opened, setOpened] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);
  const [editedPet, setEditedPet] = useState<Pet>();

  const { data, isFetching } = useGetPetById(id || "");

  const { mutate: deletePet, isSuccess: deleteSuccess } = useDeletePet();
  const { mutate: updatePet, isSuccess: updateIsSuccess } = useUpdatePet();

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteSuccess) {
      notifications.show({
        title: "Deleted Successfully",
        message: "Pet deleted successfully!",
      });
      navigate({ to: "/pet" });
    }
  }, [deleteSuccess, navigate]);

  useEffect(() => {
    if (updateIsSuccess) {
      notifications.show({
        title: "Updated Successfully",
        message: "Pet updated successfully!",
      });

      setOpened(false);
    }
  }, [updateIsSuccess]);

  const handleEdit = () => {
    if (editedPet && id) {
      updatePet({
        id,
        updatedPet: editedPet,
      });
    }
  };

  const handleDelete = () => {
    deletePet(id || "", {});
  };

  useEffect(() => {
    if (data) {
      setEditedPet(data);
    }
  }, [data]);

  if (!data && !isFetching) {
    return <Container>Pet not found!</Container>;
  }

  if (isFetching) return <Loader />;

  return (
    <Container size="sm" py={30} miw={"70vw"}>
      {!!data && (
        <>
          <Stack>
            <Group justify="space-between">
              <Title order={2}>Pet Management</Title>
              <Group>
                <Button onClick={() => setOpened(true)} variant="outline">
                  Edit
                </Button>
                <Button onClick={() => setOpenedDelete(true)} color="red">
                  Delete
                </Button>
              </Group>
            </Group>
            <Group>
              {data.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  width={200}
                  height={200}
                  radius="md"
                />
              ))}
            </Group>
            <Text>Breed: {data.breed}</Text>
            <Text>Species: {data.species}</Text>
            <Text>Age: {data.age} years</Text>
            <Text>Gender: {data.gender}</Text>
            <Text>Size: {data.size}</Text>
            <Text>Color: {data.color}</Text>
            <Text>Details: {data.healthStatus}</Text>
            <Text>Adoption Status: {data.adoptionStatus}</Text>
          </Stack>
          {!!editedPet && (
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Edit Pet"
              centered
            >
              <Stack>
                <TextInput
                  label="Name"
                  value={editedPet.name}
                  onChange={(e) =>
                    setEditedPet({ ...editedPet, name: e.target.value })
                  }
                />
                <TextInput
                  label="Breed"
                  value={editedPet.breed}
                  onChange={(e) =>
                    setEditedPet({ ...editedPet, breed: e.target.value })
                  }
                />
                <Select
                  label="Species"
                  data={["Dog", "Cat"]}
                  value={editedPet.species}
                  onChange={(value) =>
                    setEditedPet({ ...editedPet, species: value || "" })
                  }
                />
                <TextInput
                  label="Age"
                  type="number"
                  value={editedPet.age}
                  onChange={(e) =>
                    setEditedPet({
                      ...editedPet,
                      age: Number(e.target.value) || 0,
                    })
                  }
                />
                <Select
                  label="Gender"
                  data={["Male", "Female"]}
                  value={editedPet.gender}
                  onChange={(value) =>
                    setEditedPet({ ...editedPet, gender: value || "" })
                  }
                />
                <TextInput
                  label="Color"
                  value={editedPet.color}
                  onChange={(e) =>
                    setEditedPet({ ...editedPet, color: e.target.value })
                  }
                />
                <TextInput
                  label="Pet details, Health Status"
                  value={editedPet.healthStatus}
                  onChange={(e) =>
                    setEditedPet({ ...editedPet, healthStatus: e.target.value })
                  }
                />
                <FileInput
                  label="Upload Image"
                  onChange={(file) =>
                    setEditedPet({
                      ...editedPet,
                      images: [URL.createObjectURL(file as Blob)],
                    })
                  }
                />
                <Group mt={20} justify="flex-end">
                  <Button variant="default" onClick={() => setOpened(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEdit}>Save</Button>
                </Group>
              </Stack>
            </Modal>
          )}
          <Modal
            opened={openedDelete}
            onClose={() => setOpenedDelete(false)}
            title="Delete Pet"
            centered
          >
            <Stack>
              <Text>Are you sure you want to delete?</Text>

              <Group justify="end">
                <Button
                  onClick={() => setOpenedDelete(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="red">
                  Delete
                </Button>
              </Group>
            </Stack>
          </Modal>
        </>
      )}
    </Container>
  );
}
