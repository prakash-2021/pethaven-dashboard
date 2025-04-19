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
  Pagination,
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

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(6); // initial totalPage is 1

  const { mutate } = useCreatePet();
  const { mutateAsync: uploadImage } = useUploadImage();

  const { data } = useGetAllPets(page, totalPage);

  // // Update total pages when data changes
  // if (data && data.meta.totalPets !== totalPage) {
  //   setTotalPage(data.meta.totalPets);
  // }

  const handleAddPet = async () => {
    try {
      let uploadedImages: UploadedImage[] = [];

      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("images", file));
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
            setImageFiles([]);
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

        {/* Pagination */}
        {totalPage > 1 && (
          <Group justify="center" mt="lg">
            <Pagination
              value={page}
              onChange={setPage}
              total={(data?.meta.totalPets || 0) / 5}
              siblings={1}
              boundaries={1}
            />
          </Group>
        )}
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
            placeholder="Enter species"
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
            placeholder="Enter gender"
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
            label="Pet details, Health Status"
            placeholder="Enter health details"
            value={newPet.healthStatus}
            onChange={(e) =>
              setNewPet({ ...newPet, healthStatus: e.target.value })
            }
          />
          <FileInput
            multiple
            label="Upload Images"
            accept="image/*"
            value={imageFiles}
            onChange={(files) => setImageFiles(files || [])}
            placeholder="Choose images"
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
