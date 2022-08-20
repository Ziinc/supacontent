-- migrate:up

create table supacontent_content (
  id bigint generated by default as identity primary key,
  content_type_id bigint references supacontent_content_types not null,
  data jsonb not null,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table supacontent_content enable row level security;
create policy "Individuals can create content for their projects." on supacontent_content for
    insert with check (
        content_type_id = (select t.id from supacontent_content_types t inner join supacontent_projects as p on p.id = t.project_id and p.user_id = auth.uid() )
    );
create policy "Individuals can view their own project's content." on supacontent_content for
    select using (
        content_type_id = (select t.id from supacontent_content_types t inner join supacontent_projects as p on p.id = t.project_id and p.user_id = auth.uid() )
    );
create policy "Individuals can update their projet's own content." on supacontent_content for
    update  using (
        content_type_id = (select t.id from supacontent_content_types t inner join supacontent_projects as p on p.id = t.project_id and p.user_id = auth.uid() )
    );
create policy "Individuals can delete their project's content." on supacontent_content for
    delete using (
        content_type_id = (select t.id from supacontent_content_types t inner join supacontent_projects as p on p.id = t.project_id and p.user_id = auth.uid() )
    );

-- migrate:down
drop table supacontent_content cascade;