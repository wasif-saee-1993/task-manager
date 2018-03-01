import {User} from './user';

export class Feedback {
  id?: number;
  comment: string;
  creator?: User;
  creator_id?: number;
  task_id?: number;
}
