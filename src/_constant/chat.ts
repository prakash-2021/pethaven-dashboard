// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  online: boolean;
  lastActive: Date;
  lastMessage: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  content: string;
  senderId: string; // "admin" or user.id
  timestamp: Date;
  read: boolean;
}

// Mock data
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    lastActive: new Date(),
    lastMessage: "I need help with my order #12345",
    unreadCount: 3,
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    lastActive: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    lastMessage: "When will my order be shipped?",
    unreadCount: 0,
  },
  {
    id: "user3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    lastMessage: "Thanks for your help!",
    unreadCount: 0,
  },
  {
    id: "user4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    lastMessage: "I'd like to request a refund",
    unreadCount: 2,
  },
  {
    id: "user5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    lastMessage: "Is the product in stock?",
    unreadCount: 1,
  },
];

export const mockMessages: Record<string, Message[]> = {
  user1: [
    {
      id: "msg1-1",
      content: "Hello, I need help with my order #12345",
      senderId: "user1",
      timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
      read: true,
    },
    {
      id: "msg1-2",
      content: "It's been a week and I haven't received it yet",
      senderId: "user1",
      timestamp: new Date(Date.now() - 34 * 60 * 1000), // 34 minutes ago
      read: true,
    },
    {
      id: "msg1-3",
      content: "I can check that for you. Let me look up your order.",
      senderId: "admin",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: true,
    },
    {
      id: "msg1-4",
      content:
        "I see that your order has been delayed due to a stock issue. I apologize for the inconvenience.",
      senderId: "admin",
      timestamp: new Date(Date.now() - 29 * 60 * 1000), // 29 minutes ago
      read: true,
    },
    {
      id: "msg1-5",
      content: "When can I expect to receive it?",
      senderId: "user1",
      timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      read: true,
    },
    {
      id: "msg1-6",
      content: "And is there any compensation for the delay?",
      senderId: "user1",
      timestamp: new Date(Date.now() - 24 * 60 * 1000), // 24 minutes ago
      read: true,
    },
    {
      id: "msg1-7",
      content:
        "Your order should ship within 2 business days. I've added a 10% discount to your account for the inconvenience.",
      senderId: "admin",
      timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      read: true,
    },
    {
      id: "msg1-8",
      content: "Thank you, I appreciate that.",
      senderId: "user1",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false,
    },
    {
      id: "msg1-9",
      content: "One more question - will I receive a shipping notification?",
      senderId: "user1",
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      read: false,
    },
    {
      id: "msg1-10",
      content: "And what carrier are you using?",
      senderId: "user1",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
    },
  ],
  user2: [
    {
      id: "msg2-1",
      content:
        "Hi there, I placed an order yesterday and I'm wondering when it will be shipped?",
      senderId: "user2",
      timestamp: new Date(
        Date.now() - 1 * 24 * 60 * 60 * 1000 - 30 * 60 * 1000
      ), // 1 day and 30 minutes ago
      read: true,
    },
    {
      id: "msg2-2",
      content:
        "Hello Jane, thank you for your message. Orders typically ship within 1-2 business days. I can see your order is being processed and should ship today.",
      senderId: "admin",
      timestamp: new Date(
        Date.now() - 1 * 24 * 60 * 60 * 1000 - 15 * 60 * 1000
      ), // 1 day and 15 minutes ago
      read: true,
    },
    {
      id: "msg2-3",
      content: "Great, thank you! Will I receive a tracking number?",
      senderId: "user2",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
    },
    {
      id: "msg2-4",
      content:
        "Yes, you'll receive an email with tracking information as soon as your order ships.",
      senderId: "admin",
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000), // 23 hours ago
      read: true,
    },
    {
      id: "msg2-5",
      content: "When will my order be shipped?",
      senderId: "user2",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: true,
    },
  ],
  user3: [
    {
      id: "msg3-1",
      content: "I need help with setting up my new device",
      senderId: "user3",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
    },
    {
      id: "msg3-2",
      content:
        "I'd be happy to help you set up your device. What specific issues are you having?",
      senderId: "admin",
      timestamp: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000
      ), // 3 days ago + 15 minutes
      read: true,
    },
    {
      id: "msg3-3",
      content: "I can't connect it to my WiFi network",
      senderId: "user3",
      timestamp: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000
      ), // 3 days ago + 30 minutes
      read: true,
    },
    {
      id: "msg3-4",
      content:
        "Let's try a few troubleshooting steps. First, make sure your WiFi is working with other devices. Then, try restarting both your router and the device. Let me know if that helps.",
      senderId: "admin",
      timestamp: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000
      ), // 3 days ago + 45 minutes
      read: true,
    },
    {
      id: "msg3-5",
      content: "That worked! Thanks for your help!",
      senderId: "user3",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
    },
  ],
  user4: [
    {
      id: "msg4-1",
      content: "Hello, I'd like to request a refund for my recent purchase",
      senderId: "user4",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
    },
    {
      id: "msg4-2",
      content:
        "I'm sorry to hear you're not satisfied with your purchase. May I ask why you're requesting a refund?",
      senderId: "admin",
      timestamp: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000
      ), // 2 days ago + 10 minutes
      read: true,
    },
    {
      id: "msg4-3",
      content: "The product doesn't work as described",
      senderId: "user4",
      timestamp: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000
      ), // 2 days ago + 20 minutes
      read: true,
    },
    {
      id: "msg4-4",
      content:
        "I understand. I'd be happy to process a refund for you. Could you provide your order number?",
      senderId: "admin",
      timestamp: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000
      ), // 2 days ago + 30 minutes
      read: true,
    },
    {
      id: "msg4-5",
      content: "It's ORD-78901",
      senderId: "user4",
      timestamp: new Date(
        Date.now() - 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000
      ), // 1 day ago + 10 minutes
      read: false,
    },
    {
      id: "msg4-6",
      content: "Do I need to return the item?",
      senderId: "user4",
      timestamp: new Date(
        Date.now() - 1 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000
      ), // 1 day ago + 15 minutes
      read: false,
    },
  ],
  user5: [
    {
      id: "msg5-1",
      content: "Is the new XYZ product in stock?",
      senderId: "user5",
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      read: true,
    },
    {
      id: "msg5-2",
      content: "Let me check our inventory for you.",
      senderId: "admin",
      timestamp: new Date(Date.now() - 55 * 60 * 1000), // 55 minutes ago
      read: true,
    },
    {
      id: "msg5-3",
      content:
        "Yes, the XYZ product is currently in stock and available for immediate shipping.",
      senderId: "admin",
      timestamp: new Date(Date.now() - 50 * 60 * 1000), // 50 minutes ago
      read: true,
    },
    {
      id: "msg5-4",
      content: "Great! How long would shipping take to California?",
      senderId: "user5",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
    },
  ],
};
