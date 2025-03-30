
import { Navbar } from "@/components/navbar";
import { AvatarWithBadge } from "@/components/ui/avatar-with-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

const MessagesPage = () => {
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      status: "online",
      lastMessage: "Are you available for a quick chat about the project?",
      lastMessageTime: "10:32 AM",
      unread: 2,
      messages: [
        {
          id: 1,
          text: "Hi there! I saw your profile and I'm impressed with your UX design work.",
          sender: "other",
          timestamp: "Yesterday, 4:30 PM",
        },
        {
          id: 2,
          text: "Thank you! I appreciate that. I saw you're working at CodeCraft Solutions.",
          sender: "user",
          timestamp: "Yesterday, 4:35 PM",
        },
        {
          id: 3,
          text: "Yes, I've been there for about a year now. We're working on some exciting projects.",
          sender: "other",
          timestamp: "Yesterday, 4:40 PM",
        },
        {
          id: 4,
          text: "Are you available for a quick chat about the project?",
          sender: "other",
          timestamp: "10:32 AM",
        },
      ],
    },
    {
      id: 2,
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      status: "offline",
      lastMessage: "Looking forward to the meetup next week!",
      lastMessageTime: "Yesterday",
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Hey, I'm organizing a tech meetup next week in Pune. Would you be interested?",
          sender: "other",
          timestamp: "Monday, 2:15 PM",
        },
        {
          id: 2,
          text: "That sounds great! What's the focus of the meetup?",
          sender: "user",
          timestamp: "Monday, 3:20 PM",
        },
        {
          id: 3,
          text: "It's about sustainable tech solutions. I thought it might align with your interests.",
          sender: "other",
          timestamp: "Monday, 3:45 PM",
        },
        {
          id: 4,
          text: "Absolutely! Count me in. Where and when exactly?",
          sender: "user",
          timestamp: "Monday, 4:00 PM",
        },
        {
          id: 5,
          text: "It's at TechHub Pune, next Thursday at 6 PM. I'll send you the details soon.",
          sender: "other",
          timestamp: "Monday, 4:10 PM",
        },
        {
          id: 6,
          text: "Looking forward to the meetup next week!",
          sender: "other",
          timestamp: "Yesterday, 11:30 AM",
        },
      ],
    },
  ];

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    toast({
      title: "Messaging feature coming soon!",
      description: "This feature will be available in the next update.",
    });

    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex flex-col h-[calc(100vh-10rem)] rounded-lg border bg-background shadow">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold mb-2">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search conversations..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(100%-5rem)]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center p-4 border-b cursor-pointer transition-colors ${
                        activeConversation?.id === conversation.id
                          ? "bg-accent"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <AvatarWithBadge
                        src={conversation.avatar}
                        fallback={conversation.name}
                        status={conversation.status}
                      />
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                            {conversation.lastMessageTime}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No conversations found.
                  </div>
                )}
              </div>
            </div>

            {/* Message Content */}
            <div className="hidden md:flex flex-col w-2/3">
              {activeConversation ? (
                <>
                  <div className="p-4 border-b flex items-center">
                    <AvatarWithBadge
                      src={activeConversation.avatar}
                      fallback={activeConversation.name}
                      status={activeConversation.status}
                    />
                    <div className="ml-3">
                      <h3 className="font-medium">{activeConversation.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {activeConversation.status === "online"
                          ? "Online"
                          : activeConversation.status === "away"
                          ? "Away"
                          : "Offline"}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {activeConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : ""
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "user"
                                ? "text-primary-foreground/80"
                                : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 border-t flex gap-2"
                  >
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Select a conversation to start messaging.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;
