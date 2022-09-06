interface SideBarData {
    title: string,
    path: string,
    icon: React.React;
    cName: string,
}

declare module "*.png" {
  const value: any;
  export = value;
}

interface Job {
  uid?: string;
  id?: string;
  _id?: string;
  company: string;
  position: string;
  status: string;
  date_applied: string;
  date_interview: string;
}

interface Counts {
  string?: number
}