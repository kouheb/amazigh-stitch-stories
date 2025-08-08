-- Backfill profiles for existing users missing a row
insert into public.profiles (id, email, full_name, display_name, username)
select u.id,
       u.email,
       u.raw_user_meta_data->>'full_name',
       coalesce(u.raw_user_meta_data->>'full_name', lower(regexp_replace(split_part(u.email,'@',1), '[^a-zA-Z0-9_]+', '', 'g'))),
       lower(regexp_replace(split_part(u.email,'@',1), '[^a-zA-Z0-9_]+', '', 'g'))
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;