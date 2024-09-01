export type EventType = {
  id: string;
  title: string;
  start_date: string;
  start_time: string;
  due_date: string;
  due_time: string;
  is_lock_event: boolean;
  org_domain: string;
  added_by: string;
  added_at: string;
  updated_at: string;
};

export type CategoryType = {
  name: string;
  event_id: string;
  added_at: string;
  updated_at: string;
};

export type ParticipantType = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  imgUrl?: string;
  category_id: string;
  added_at: string;
  updated_at: string;
};
