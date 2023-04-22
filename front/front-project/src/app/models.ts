// @ts-ignore
import {v4 as uuidv4} from 'uuid';


export interface Company {
  name: string;
  location: string;
  website: string;
  description: string;
  logo: string;
}

export interface User {
  id: bigint;
  company: Company;
  email: string;
  phone_number: string;
  password: string;
  first_name: string;
  last_name: string;
  user_type: string
}

export interface JobPost {
  id: string,
  company_name: string,
  title: string,
  description: string,
  location: string,
  salary: number,
  created_at: Date
}
