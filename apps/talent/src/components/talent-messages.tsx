"use client";

import { useState } from "react";
import type { MessageThread } from "@/lib/types";

interface TalentMessagesProps {
    threads: MessageThread[];
    onSendMessage?: (threadId: string, message: string) => void;
}

export function TalentMessages({ threads, onSendMessage }: TalentMessagesProps) {
    const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
    const [messageText, setMessageText] = useState("");

    const handleSend = () => {
        if (selectedThread && messageText.trim() && onSendMessage) {
            onSendMessage(selectedThread.id, messageText);
            setMessageText("");
        }
    };

    return (
        <div className="ui:grid md:ui:grid-cols-3 ui:gap-6 ui:h-[600px]">
            {/* Thread List */}
            <div className="ui:space-y-3 ui:overflow-y-auto">
                <h2 className="ui:text-2xl ui:font-bold ui:mb-4">Messages</h2>
                {threads.length === 0 ? (
                    <div className="lp-card ui:p-6 ui:text-center">
                        <p className="ui:text-4xl ui:mb-2">📭</p>
                        <p className="ui:text-gray-600 dark:ui:text-gray-400">No messages yet</p>
                    </div>
                ) : (
                    threads.map((thread) => (
                        <div
                            key={thread.id}
                            onClick={() => setSelectedThread(thread)}
                            className={`lp-card ui:p-4 ui:cursor-pointer ui:transition-all ${selectedThread?.id === thread.id
                                    ? 'ui:ring-2 ui:ring-purple-500 ui:bg-purple-50 dark:ui:bg-purple-950/30'
                                    : 'hover:ui:shadow-md'
                                }`}
                        >
                            <div className="ui:flex ui:justify-between ui:items-start ui:mb-2">
                                <h4 className="ui:font-semibold ui:text-sm">{thread.subject}</h4>
                                {thread.unreadCount > 0 && (
                                    <span className="ui:bg-red-500 ui:text-white ui:text-xs ui:px-2 ui:py-0.5 ui:rounded-full">
                                        {thread.unreadCount}
                                    </span>
                                )}
                            </div>
                            <p className="ui:text-xs ui:text-gray-600 dark:ui:text-gray-400">
                                {thread.participants.find(p => p.role === 'manager')?.name || 'Management'}
                            </p>
                            <p className="ui:text-xs ui:text-gray-500 ui:mt-1">
                                {new Date(thread.lastMessageAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* Message View */}
            <div className="md:ui:col-span-2 lp-card ui:p-6 ui:flex ui:flex-col">
                {selectedThread ? (
                    <>
                        <div className="ui:border-b ui:border-gray-200 dark:ui:border-gray-800 ui:pb-4 ui:mb-4">
                            <h3 className="ui:text-xl ui:font-bold">{selectedThread.subject}</h3>
                            <p className="ui:text-sm ui:text-gray-600 dark:ui:text-gray-400">
                                Conversation with {selectedThread.participants.find(p => p.role === 'manager')?.name}
                            </p>
                        </div>

                        {/* Messages */}
                        <div className="ui:flex-1 ui:overflow-y-auto ui:space-y-4 ui:mb-4">
                            {selectedThread.messages.map((message) => {
                                const isFromMe = message.fromUserId === 'current-talent-id'; // Replace with actual user ID
                                return (
                                    <div
                                        key={message.id}
                                        className={`ui:flex ${isFromMe ? 'ui:justify-end' : 'ui:justify-start'}`}
                                    >
                                        <div
                                            className={`ui:max-w-[70%] ui:rounded-lg ui:p-3 ${isFromMe
                                                    ? 'ui:bg-purple-600 ui:text-white'
                                                    : 'ui:bg-gray-100 dark:ui:bg-gray-800'
                                                }`}
                                        >
                                            <p className="ui:text-sm ui:font-medium ui:mb-1">
                                                {message.fromUserName}
                                            </p>
                                            <p className="ui:text-sm">{message.body}</p>
                                            <p
                                                className={`ui:text-xs ui:mt-2 ${isFromMe ? 'ui:text-purple-200' : 'ui:text-gray-500'
                                                    }`}
                                            >
                                                {new Date(message.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Message Input */}
                        <div className="ui:flex ui:gap-2">
                            <input
                                type="text"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="ui:flex-1 ui:px-4 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-700 ui:rounded-md ui:bg-white dark:ui:bg-gray-900 focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-purple-500"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!messageText.trim()}
                                className="ui:px-6 ui:py-2 ui:bg-purple-600 hover:ui:bg-purple-700 disabled:ui:opacity-50 disabled:ui:cursor-not-allowed ui:text-white ui:rounded-md ui:transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="ui:flex-1 ui:flex ui:items-center ui:justify-center ui:text-gray-500">
                        <div className="ui:text-center">
                            <p className="ui:text-6xl ui:mb-4">💬</p>
                            <p>Select a conversation to view messages</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
