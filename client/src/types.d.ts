interface SideBarData {
  title: string;
  path: string;
  icon: React.React;
  cName: string;
}

declare module '*.png' {
  const value: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
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
  updatedAt?: string;
}

interface Counts {
  string?: number;
}

interface FunctionType<T> {
  (arg: T): void;
}

interface formStateType {
  [key: string]: string;
}
interface blurStateType {
  [key: string]: boolean | string;
}

type filedNameType =
  | 'company'
  | 'position'
  | 'status'
  | 'date_applied'
  | 'date_interview';
