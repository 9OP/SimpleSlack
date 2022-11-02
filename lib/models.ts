export interface Channel {
  id: string;
  name: string;
  created: Date;
  numMembers: number;
}

export interface Message {
  ts: Date;
  userId: string;
  text: string;
}
