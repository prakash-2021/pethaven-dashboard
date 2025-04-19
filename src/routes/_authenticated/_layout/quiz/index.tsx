import { useCreateQuiz, useGetAllQuiz } from "@/api/quiz";
import {
  Badge,
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
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/_layout/quiz/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [opened, { open, close }] = useDisclosure(false);
  const [question, setQuestion] = useState("");
  const { mutate } = useCreateQuiz();

  const handleAddQuestion = () => {
    if (question.trim()) {
      mutate({ questionText: question });
      setQuestion("");
      close();
    }
  };

  const { data } = useGetAllQuiz();

  return (
    <Container size="sm" py={30} miw={"70vw"}>
      <Stack>
        <Group justify="space-between">
          <Title order={2} mb={24}>
            Quiz
          </Title>
          <Button onClick={open}>Add new question</Button>
        </Group>

        {/* Quiz Options */}
        <Stack gap={1}>
          {data?.map((q, index) => (
            <Link to={q.questionId} key={index}>
              <Card
                shadow="md"
                p={16}
                withBorder
                w={"fit-content"}
                mb={12}
                style={{ cursor: "pointer" }}
              >
                <Group>
                  <Text size="md">
                    {index + 1}. {q.questionText}
                  </Text>

                  <Badge>{q.answers.length}</Badge>
                </Group>
              </Card>
            </Link>
          ))}
        </Stack>
      </Stack>

      {/* Modal for adding question */}
      <Modal opened={opened} onClose={close} title="Add New Question" centered>
        <Stack>
          <TextInput
            placeholder="Enter your question"
            value={question}
            onChange={(event) => setQuestion(event.currentTarget.value)}
          />
          <Group mt={20} justify="flex-end">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleAddQuestion}>Add</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
