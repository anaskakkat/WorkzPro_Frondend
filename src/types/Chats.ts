export interface Chat {
  _id: string;
  recieverName: string;
  messages: Message[];
  createdAt: string;
}

export interface Message {
  content: string;
}
