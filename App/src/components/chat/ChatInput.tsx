import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const ChatInput = ({
  onSendMessage,
  isLoading = false,
  placeholder = "Ask C.H.I.P. to find anything..."
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-card/95 backdrop-blur-sm">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="w-full resize-none rounded-lg border-input bg-background py-3 pl-4 pr-14 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20"
        />
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="absolute bottom-2.5 right-3 h-8 w-8 rounded-full bg-primary p-0 text-primary-foreground transition-colors hover:bg-primary/90 disabled:bg-gray-400 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-5 w-5" />
          )}
        </Button>
      </div>
    </form>
  );
};
