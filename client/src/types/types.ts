export interface Community {
  community_name: string;
  id: number;
  description: string;
  created_at: string;
  members: [Member];
}

export interface Member {
  email: string;
  first_name: string;
  last_name: string;
}

export interface Challenge {
  name: string;
  start_date: string;
  end_date: string;
  goal: number;
  community_id: number;
}
