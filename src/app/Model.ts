export interface Job {
  id: number;
  name: string;
  responsibilities: string[];
  skills: string[];
  education: string;
  experience: string;
}

export interface Emp {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  branch: Branch;
  job_id: number;
}

export interface JobFilter {
  id: number;
  text: string;
  value: string;
}

export interface EmpTable {
  id: number;
  name: string;
  username: string;
  email: string;
  address_street: string;
  address_suite: string;
  branch_name: string;
  branch_location: string;
  job: JobFilter;
}

interface Address {
  street: string;
  suite: string;
}

interface Branch {
  name: string;
  location: string;
}

export interface ModalObj {
  number: number;
  isVisible: boolean;
  alert?: string;
  msg?: string;
  action?: string;
  obj?: EmpTable;
}
