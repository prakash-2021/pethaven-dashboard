import {
  useCreateAnswer,
  useDeleteQuiz,
  useGetQuizById,
  useUpdateQuiz,
} from "@/api/quiz";
import {
  Button,
  Card,
  Container,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/_layout/quiz/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: Route.id });

  const { data } = useGetQuizById(id || "");

  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [question, setQuestion] = useState("");

  const [answerOpened, { open: openAnswer, close: closeAnswer }] =
    useDisclosure(false);

  useEffect(() => {
    setQuestion(data?.questionText || "");
  }, [data]);

  const { mutate, isSuccess } = useDeleteQuiz();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate({ to: "/quiz" });
    }
  }, [isSuccess]);

  const { mutate: updateQuiz } = useUpdateQuiz();

  const [answer, setAnswer] = useState("");

  const { mutate: createAnswer } = useCreateAnswer();

  return (
    <Container size="sm" py={30} w={"80vw"}>
      <Stack>
        <Group justify="space-between">
          <Title order={2} mb={24}>
            Quiz Detail
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
          <Text size="md">{data?.questionText}</Text>
        </Card>

        <Group justify="space-between">
          <Title order={4} mb={24}>
            Quiz Options
          </Title>

          <Group>
            <Button variant="outline" onClick={openAnswer}>
              Add
            </Button>
          </Group>
        </Group>

        {/* Quiz Options */}
        <Stack gap={1}>
          {data?.answers.map((answer) => (
            <Link
              to={`/answer/$id`}
              params={{ id: answer.answerId }}
              key={answer.answerId}
            >
              <Card
                shadow="md"
                p={16}
                withBorder
                mb={12}
                style={{
                  cursor: "pointer",
                }}
              >
                <Text size="md">{answer.answerText}</Text>
              </Card>
            </Link>
          ))}
        </Stack>
      </Stack>

      <Modal
        opened={editOpened}
        onClose={closeEdit}
        title="Edit Quiz Question"
        centered
      >
        <Stack>
          <TextInput
            placeholder="Enter your question"
            value={question}
            onChange={(event) => setQuestion(event.currentTarget.value)}
          />
          <Group mt={20} justify="flex-end">
            <Button variant="default" onClick={closeEdit}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Call your update API here
                updateQuiz({ id, questionText: question });
                closeEdit();
              }}
            >
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={answerOpened}
        onClose={closeAnswer}
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
            <Button variant="default" onClick={closeAnswer}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Call your update API here
                createAnswer({ questionId: id, answerText: answer });
                setAnswer("");
                closeAnswer();
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
        title="Delete Quiz?"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this quiz?</Text>
          <Group mt={20} justify="flex-end">
            <Button variant="default" onClick={closeDelete}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                // Call your delete API here
                mutate(id);
                closeDelete();
              }}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
