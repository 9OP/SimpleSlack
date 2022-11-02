export interface Channel {
  id: string;
  name: string;
  created: Date;
}

export interface Message {
  ts: Date;
  userId: string;
  text: string;
}

export interface Member {
  id: string;
  name: string;
  admin: boolean;
}
