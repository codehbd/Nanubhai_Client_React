import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function ChatButton() {
  return (
    <FloatingWhatsApp
      avatar="/next.svg"
      phoneNumber="+8801637205557"
      accountName="নানুভাইয়ের রসনাকথন"
      statusMessage="Available"
      chatMessage="Welcome to Nanubhaier Rosonakothon. How can we help you?"
      notification={true}
      notificationSound={true}
      notificationSoundSrc="/audio/notification.mp3"
    />
  );
}
