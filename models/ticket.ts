export interface Ticket {
    id?: string;
    course: string;
    location: string;
    description: string;
    name: any;
    uid: string;
    requested: boolean;
    requests: string[];
    matched: boolean;
    matchedID?: string;

  }