import {User} from './user';
import {Feedback} from './feedback';

export class Task {
  id: number;
  title: string;
  body: string;
  creator?: User;
  creator_id?: number;
  assignee?: User;
  assignee_id?: number;
  feedbacks?: Feedback[];
}
