import { useGetAllPets } from "@/api/pet";
import {
  useAttachPet,
  useDeleteAnswer,
  useGetAnswerById,
  usePetsByAnswerId,
  useUpdateAnswer,
} from "@/api/quiz";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Modal,
  MultiSelect,
  SelectProps,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/_layout/answer/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = usePetsByAnswerId();

  const { id } = useParams({ from: Route.id });

  const { data: answerInfo } = useGetAnswerById(id);

  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [attachOpened, { open: openAttach, close: closeAttach }] =
    useDisclosure(false);

  const { mutate: updateAnswer } = useUpdateAnswer();

  const { mutate: deleteAnswer, isSuccess } = useDeleteAnswer();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate({ to: "/quiz" });
    }
  }, [isSuccess]);

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setAnswer(answerInfo?.answerText || "");
  }, [answerInfo]);

  useEffect(() => {
    mutate({ answerIds: [id || ""] });
  }, [id, mutate, attachOpened]);

  const { data: getPets } = useGetAllPets(1, 999);

  const renderSelectOption: SelectProps["renderOption"] = ({
    option,
    checked,
  }) => (
    <Group gap="sm">
      {/* @ts-ignore */}
      <Avatar src={option.image} radius="xl" size="sm" />
      <Text>{option.label}</Text>
      {checked && <IconCheck color="black" size={20} />}
    </Group>
  );

  const {
    mutate: attachPet,
    isError,
    isSuccess: attachSuccess,
  } = useAttachPet();

  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Failed to add",
        message: "You can not add the selected pet",
        color: "red",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (attachSuccess) {
      notifications.show({
        title: "Successfully added",
        message: "Pet added successfully",
      });
      mutate({ answerIds: [id || ""] });
    }
  }, [attachSuccess]);

  return (
    <Container size="sm" py={30} w={"80vw"}>
      <Stack>
        <Group justify="space-between">
          <Title order={2} mb={24}>
            Answer Detail
          </Title>

          <Group>
            <Button variant="outline" onClick={openEdit}>
              Edit
            </Button>
            <Button color="red" onClick={openDelete}>
              Delete
            </Button>
          </Group>
        </Group>

        <Card
          shadow="md"
          p={16}
          withBorder
          mb={12}
          style={{
            cursor: "pointer",
          }}
        >
          <Text size="md">{answerInfo?.answerText}</Text>
        </Card>

        <Group justify="space-between">
          <Title order={4} mb={24}>
            Pets
          </Title>

          <Group>
            <Button variant="outline" onClick={openAttach}>
              Add
            </Button>
          </Group>
        </Group>

        <Grid>
          {data &&
            data[0]?.pets.map((pet) => (
              <Grid.Col key={pet.petId} span={{ base: 12, sm: 6, md: 4 }}>
                <Link to="/pet/$id" params={{ id: pet.petId }}>
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
                    </Stack>
                  </Card>
                </Link>
              </Grid.Col>
            ))}
        </Grid>
      </Stack>

      <Modal
        opened={editOpened}
        onClose={closeEdit}
        title="Add Answer"
        centered
      >
        <Stack>
          <TextInput
            placeholder="Enter your answer"
            value={answer}
            onChange={(event) => setAnswer(event.currentTarget.value)}
          />
          <Group mt={20} justify="flex-end">
            <Button variant="default" onClick={closeEdit}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Call your update API here
                updateAnswer({ id, answerText: answer });
                closeEdit();
              }}
            >
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title="Delete Answer?"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this answer?</Text>
          <Group mt={20} justify="flex-end">
            <Button variant="default" onClick={closeDelete}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                // Call your delete API here
                deleteAnswer(id);
                closeDelete();
              }}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={attachOpened}
        onClose={() => {
          closeAttach();
          setValue([]);
        }}
        title="Add Pets"
        centered
        size="xl"
        maw={400}
      >
        <Stack>
          <MultiSelect
            placeholder="Select pets"
            data={
              getPets?.pets.map((pet) => ({
                value: pet.petId,
                label: `${pet.name} (${pet.breed}, ${pet.species})`,
                image: pet.images[0],
              })) || []
            }
            searchable
            limit={20}
            renderOption={renderSelectOption}
            value={value}
            onChange={setValue}
          />
          <Group mt={20} justify="flex-end">
            <Button
              variant="default"
              onClick={() => {
                closeAttach();
                setValue([]);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Call your update API here
                attachPet({ id, petId: value || "" });
                closeAttach();
              }}
            >
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
