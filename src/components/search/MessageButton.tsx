import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MessageButtonProps {
  recipientId: string;
  className?: string;
}

export const MessageButton = ({ recipientId, className }: MessageButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/messaging?user=${recipientId}`);
  };
  return (
    <Button onClick={handleClick} variant="outline" className={className}>
      <MessageCircle className="h-4 w-4 mr-2" /> Message
    </Button>
  );
};
