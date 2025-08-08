
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 max-w-4xl">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616c163f505?w=32&h=32&fit=crop&crop=face" />
        <AvatarFallback>FM</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col">
        <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1 px-1">typing...</p>
      </div>
    </div>
  );
};
