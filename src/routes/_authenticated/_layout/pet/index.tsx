import {
  UploadedImage,
  useCreatePet,
  useGetAllPets,
  useUploadImage,
} from "@/api/pet";
import {
  Button,
  Card,
  Container,
  FileInput,
  Grid,
  Group,
  Image,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/_layout/pet/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [opened, { open, close }] = useDisclosure(false);

  const [newPet, setNewPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    size: "MEDIUM",
    color: "",
    healthStatus: "",
    adoptionStatus: "AVAILABLE",
  });

  const [imageFile, setImageFile] = useState<File | null>(null); // 👈 hold image separately

  const { mutate } = useCreatePet();
  const { mutateAsync: uploadImage } = useUploadImage();

  const handleAddPet = async () => {
    try {
      let uploadedImages: UploadedImage[] = [];

      if (imageFile) {
        const formData = new FormData();
        formData.append("images", imageFile);
        uploadedImages = await uploadImage(formData);
      }

      await mutate(
        {
          ...newPet,
          age: Number(newPet.age),
          images: uploadedImages.map((img) => img.secure_url),
          addedAt: new Date(),
          petId: "",
        },
        {
          onSuccess: () => {
            close();
            setNewPet({
              name: "",
              species: "",
              breed: "",
              age: "",
              gender: "",
              size: "MEDIUM",
              color: "",
              healthStatus: "",
              adoptionStatus: "AVAILABLE",
            });
            setImageFile(null);
          },
        }
      );
    } catch (err) {
      console.error("Error uploading or adding pet:", err);
    }
  };

  const handleDeletePet = (id: string) => {
    // setPets(pets.filter((pet) => pet.id !== id));
  };

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);

  const { data } = useGetAllPets(page, totalPage);

  return (
    <Container size="sm" py={30} miw={"70vw"}>
      <Stack>
        <Group justify="space-between">
          <Title order={2}>Pet Management</Title>
          <Button onClick={open}>Add new pet</Button>
        </Group>

        <Grid>
          {data?.pets.map((pet) => (
            <Grid.Col key={pet.petId} span={{ base: 12, sm: 6, md: 4 }}>
              <Link to={pet.petId}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image src={pet.images[0]} height={180} alt={pet.name} />
                  </Card.Section>
                  <Stack mt="md">
                    <Title order={4}>{pet.name}</Title>
                    <Text size="sm">
                      {pet.species} - {pet.breed}
                    </Text>
                    <Text size="sm">Age: {pet.age} years</Text>
                    <Text size="sm">Status: {pet.adoptionStatus}</Text>
                    <Group>
                      <Button
                        color="red"
                        size="xs"
                        onClick={() => handleDeletePet(pet.petId)}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      {/* Add Pet Modal */}
      <Modal opened={opened} onClose={close} title="Add New Pet" centered>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Enter pet name"
            value={newPet.name}
            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          />
          <TextInput
            label="Breed"
            placeholder="Enter breed"
            value={newPet.breed}
            onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
          />
          <Select
            label="Species"
            data={["Dog", "Cat"]}
            value={newPet.species}
            onChange={(value) => setNewPet({ ...newPet, species: value || "" })}
          />
          <TextInput
            label="Age"
            type="number"
            placeholder="Age in years"
            value={newPet.age}
            onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
          />
          <Select
            label="Gender"
            data={["MALE", "FEMALE"]}
            value={newPet.gender}
            onChange={(value) => setNewPet({ ...newPet, gender: value || "" })}
          />
          <TextInput
            label="Color"
            placeholder="Enter color"
            value={newPet.color}
            onChange={(e) => setNewPet({ ...newPet, color: e.target.value })}
          />
          <TextInput
            label="Health Status"
            placeholder="Enter health details"
            value={newPet.healthStatus}
            onChange={(e) =>
              setNewPet({ ...newPet, healthStatus: e.target.value })
            }
          />
          <FileInput
            label="Upload Image"
            accept="image/*"
            value={imageFile}
            onChange={(file) => setImageFile(file)}
            placeholder="Choose an image"
          />
          <Group mt={20} justify="flex-end">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleAddPet}>Add</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
