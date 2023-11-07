export interface Community {
  community_name: string;
  id: number|null;
  description: string;
  members: [Member]|[];
}

export interface Member {
  email: string;
  first_name: string;
  last_name: string;
  identifier: string;
}

export interface Challenge {
  name: string;
  goal: number|null;
  community_id: number|null;
}

export interface OnScreenAlertProps {
  showSnack:boolean,
snackColor:"error"| "success"|"info",
snackMessage: string,
}

export interface TutorialCardProps {
  card:{
  title:string,
  content:string,
  link:string,
  btnText:string,
  }}
