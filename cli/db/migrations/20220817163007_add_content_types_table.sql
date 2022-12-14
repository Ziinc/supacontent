-- migrate:up

create table supacontent.content_types (
  id bigint generated by default as identity primary key,
  project_id bigint references supacontent.projects not null,
  type varchar check (type  = any('{single, collection}' :: varchar[]) ),
  name varchar check (char_length(name) > 3),
  fields jsonb not null,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table supacontent.content_types enable row level security;
create policy "Individuals can create content types for their projects." on supacontent.content_types for
    insert with check (
        project_id in (select id from supacontent.projects t where t.user_id = auth.uid() )
    );
create policy "Individuals can view their own content types projects. " on supacontent.content_types for
    select using (
        project_id in (select id from supacontent.projects t where t.user_id = auth.uid() )
    );
create policy "Individuals can update their projet's own content types." on supacontent.content_types for
    update  using (
        project_id in (select id from supacontent.projects t where t.user_id = auth.uid() )
    );
create policy "Individuals can delete their project's content types." on supacontent.content_types for
    delete using (
        project_id  in (select id from supacontent.projects t where t.user_id = auth.uid() )
    );


-- migrate:down

-- drop table

drop table supacontent.content_types cascade;