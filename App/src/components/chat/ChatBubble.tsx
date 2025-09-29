import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: string | ReactNode;
  isUser: boolean;
}

export const ChatBubble = ({ message, isUser }: ChatBubbleProps) => {
  if (isUser) {
    return (
      <div className="flex justify-end animate-in slide-in-from-bottom-2 duration-300">
        <div className="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 text-sm chat-bubble-user text-white ml-12">
          <div className="break-words">
            {message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300">
      <img src="/logo.svg" alt="C.H.I.P. Logo" className="h-6 w-6 flex-shrink-0" />
      <div className="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl text-sm text-text-primary mr-12">
        <div className="break-words">
          {message}
        </div>
      </div>
    </div>
  );
};
