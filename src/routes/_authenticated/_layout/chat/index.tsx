import { Message, mockMessages, mockUsers, User } from "@/_constant/chat";

import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCheck,
  IconChecks,
  IconMoodSmile,
  IconPaperclip,
  IconSend,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/_authenticated/_layout/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    mockUsers[0]?.id || null
  );
  const [messages, setMessages] =
    useState<Record<string, Message[]>>(mockMessages);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [navbarOpened, setNavbarOpened] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUserId, messages]);

  // Close navbar on mobile when a user is selected
  useEffect(() => {
    if (isMobile && selectedUserId) {
      setNavbarOpened(false);
    } else if (!isMobile) {
      setNavbarOpened(true);
    }
  }, [isMobile, selectedUserId]);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle sending a message
  const handleSendMessage = () => {
    if (!selectedUserId || !message.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: message,
      senderId: "admin",
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newMessage],
    }));

    // Mark all messages from this user as read
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUserId ? { ...user, unreadCount: 0 } : user
      )
    );

    setMessage("");
  };

  // Handle selecting a user
  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);

    // Mark all messages from this user as read
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, unreadCount: 0 } : user
      )
    );

    // On mobile, hide navbar after selecting a user
    if (isMobile) {
      setNavbarOpened(false);
    }
  };

  const selectedUserMessages = selectedUserId
    ? messages[selectedUserId] || []
    : [];
  const selectedUser = users.find((user) => user.id === selectedUserId);

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];

  if (selectedUserMessages.length > 0) {
    selectedUserMessages.forEach((message) => {
      const messageDate = new Date(message.timestamp).toLocaleDateString();
      const existingGroup = groupedMessages.find(
        (group) => group.date === messageDate
      );

      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groupedMessages.push({ date: messageDate, messages: [message] });
      }
    });
  }

  return (
    <div>
      <Group align="flex-start">
        <Stack gap="xs">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Paper
                key={user.id}
                p="xs"
                withBorder={user.id === selectedUserId}
                bg={
                  user.id === selectedUserId
                    ? "var(--mantine-color-blue-light)"
                    : undefined
                }
                onClick={() => handleUserSelect(user.id)}
                style={{ cursor: "pointer" }}
              >
                <Group wrap="nowrap" align="flex-start">
                  <Box pos="relative">
                    <Avatar src={user.avatar} alt={user.name} radius="xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </Avatar>
                    {user.online && (
                      <Box
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "green",
                          border: "2px solid white",
                        }}
                      />
                    )}
                  </Box>

                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm" fw={500} truncate>
                        {user.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {/* {formatTime(user.lastActive)} */}
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed" truncate>
                      {user.lastMessage}
                    </Text>
                  </Box>

                  {user.unreadCount > 0 && (
                    <Badge color="red" variant="filled" size="sm" radius="xl">
                      {user.unreadCount}
                    </Badge>
                  )}
                </Group>
              </Paper>
            ))
          ) : (
            <Text ta="center" c="dimmed" py="xl">
              No users found
            </Text>
          )}
        </Stack>

        <Box maw={800}>
          {selectedUserId ? (
            <Flex direction="column" h="calc(100vh - 60px - 2rem)">
              {/* User info header */}
              <Paper p="md" withBorder mb="md">
                <Group>
                  <Avatar src={selectedUser?.avatar} radius="xl">
                    {selectedUser?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                  <Box>
                    <Text fw={500}>{selectedUser?.name}</Text>
                    <Text size="xs" c="dimmed">
                      {selectedUser?.email}
                    </Text>
                  </Box>
                  {selectedUser?.online && (
                    <Badge color="green" variant="light" size="sm">
                      Online
                    </Badge>
                  )}
                </Group>
              </Paper>

              {/* Messages */}
              <Paper
                withBorder
                p="md"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ScrollArea
                  style={{ height: "100%" }}
                  viewportRef={messagesEndRef}
                >
                  <Stack gap="lg">
                    {groupedMessages.map((group, groupIndex) => (
                      <Stack key={groupIndex} gap="xs">
                        <Flex justify="center">
                          <Badge variant="light" size="sm">
                            {/* {formatDateHeader(group.date)} */}
                          </Badge>
                        </Flex>

                        {group.messages.map((msg) => (
                          <Flex
                            key={msg.id}
                            justify={
                              msg.senderId === "admin"
                                ? "flex-end"
                                : "flex-start"
                            }
                            gap="xs"
                          >
                            <Paper
                              p="sm"
                              radius="lg"
                              bg={
                                msg.senderId === "admin"
                                  ? "var(--mantine-color-blue-filled)"
                                  : "var(--mantine-color-gray-1)"
                              }
                              c={msg.senderId === "admin" ? "white" : "black"}
                              style={{
                                maxWidth: "80%",
                                borderBottomRightRadius:
                                  msg.senderId === "admin" ? 0 : undefined,
                                borderBottomLeftRadius:
                                  msg.senderId === "admin" ? undefined : 0,
                              }}
                            >
                              <Text size="sm">{msg.content}</Text>
                              <Flex
                                justify={
                                  msg.senderId === "admin"
                                    ? "flex-end"
                                    : "flex-start"
                                }
                                align="center"
                                gap={4}
                                mt={4}
                              >
                                <Text size="xs" opacity={0.7}>
                                  {/* {msg.timestamp} */}
                                </Text>
                                {msg.senderId === "admin" &&
                                  (msg.read ? (
                                    <IconChecks size={12} opacity={0.7} />
                                  ) : (
                                    <IconCheck size={12} opacity={0.7} />
                                  ))}
                              </Flex>
                            </Paper>
                          </Flex>
                        ))}
                      </Stack>
                    ))}

                    {selectedUserMessages.length === 0 && (
                      <Flex justify="center" align="center" h="100%">
                        <Text c="dimmed">No messages yet</Text>
                      </Flex>
                    )}
                  </Stack>
                </ScrollArea>
              </Paper>

              {/* Message input */}
              <Paper withBorder p="md" mt="md">
                <Flex gap="sm" align="flex-end">
                  <ActionIcon variant="subtle" radius="xl">
                    <IconPaperclip size={18} />
                  </ActionIcon>

                  <Textarea
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    autosize
                    minRows={2}
                    maxRows={4}
                    style={{ flex: 1 }}
                  />

                  <Flex direction="column" gap="xs">
                    <ActionIcon variant="subtle" radius="xl">
                      <IconMoodSmile size={18} />
                    </ActionIcon>

                    <ActionIcon
                      color="blue"
                      radius="xl"
                      variant="filled"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <IconSend size={18} />
                    </ActionIcon>
                  </Flex>
                </Flex>
              </Paper>
            </Flex>
          ) : (
            <Flex justify="center" align="center" h="calc(100vh - 60px - 2rem)">
              <Text c="dimmed">Select a user to start chatting</Text>
            </Flex>
          )}
        </Box>
      </Group>
    </div>
  );
}
