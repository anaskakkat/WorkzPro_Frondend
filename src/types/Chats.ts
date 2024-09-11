export interface Chat {
  _id: string;
  recieverName: string;
  messages: Message[];
  createdAt: string;
  participants:string[]
}

export interface Message {
  message: string;
  chatId: string;
  sender: string;
  receiver: string | null;

}
