// @ts-ignore
import {v4 as uuidv4} from 'uuid';

export interface User {
  id: uuidv4;
  email: string;
  phone_number: string;

  password: string;
  firstName: string;
  lastName: string;
}

export interface Company {
  // id: uuidv4;
  // user: User;
  name: string;
  location: string;
  website: string;
  description: string;
  logo: string;
}
