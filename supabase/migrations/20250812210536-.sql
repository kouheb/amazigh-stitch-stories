begin;

-- Delete demo or placeholder events
DELETE FROM public.events
WHERE created_by IS NULL
   OR lower(title) ~ '(test|demo|sample|lorem|placeholder)'
   OR lower(coalesce(description,'')) ~ '(test|demo|sample|lorem|placeholder)'
   OR lower(coalesce(organizer,'')) IN ('me','test','demo');

-- Clean orphan event registrations
DELETE FROM public.event_registrations er
WHERE NOT EXISTS (
  SELECT 1 FROM public.events e WHERE e.id = er.event_id
);

-- Delete demo or placeholder courses
DELETE FROM public.courses
WHERE creator_id IS NULL
   OR lower(title) ~ '(test|demo|sample|lorem|placeholder)';

-- Clean orphan modules and lessons
DELETE FROM public.course_modules m
WHERE NOT EXISTS (
  SELECT 1 FROM public.courses c WHERE c.id = m.course_id
);

DELETE FROM public.lessons l
WHERE NOT EXISTS (
  SELECT 1 FROM public.course_modules m WHERE m.id = l.module_id
);

-- Delete demo marketplace listings
DELETE FROM public.marketplace_listings
WHERE seller_id IS NULL
   OR lower(title) ~ '(test|demo|sample|lorem|placeholder)'
   OR lower(coalesce(description,'')) ~ '(test|demo|sample|lorem|placeholder)';

-- Clean orphan listing images
DELETE FROM public.marketplace_listing_images i
WHERE NOT EXISTS (
  SELECT 1 FROM public.marketplace_listings l WHERE l.id = i.listing_id
);

-- Remove obvious demo messages
DELETE FROM public.messages
WHERE lower(coalesce(content,'')) LIKE '%test%';

-- Remove empty conversations (no messages)
DELETE FROM public.conversations c
WHERE NOT EXISTS (
  SELECT 1 FROM public.messages m WHERE m.conversation_id = c.id
);

-- Remove demo notifications
DELETE FROM public.notifications
WHERE lower(coalesce(message,'')) ~ '(test|demo|sample|lorem|placeholder)';

-- Reset likes/views/comments on content items to eliminate fake counts
UPDATE public.portfolio_items SET likes = 0, views = 0, comments = 0;
UPDATE public.showcase_items SET likes = 0, views = 0;

-- Recalculate user_stats strictly from real relations and unread notifications
UPDATE public.user_stats us SET
  followers_count = COALESCE((SELECT count(*) FROM public.follow_relationships fr WHERE fr.following_id = us.user_id), 0),
  following_count = COALESCE((SELECT count(*) FROM public.follow_relationships fr WHERE fr.follower_id = us.user_id), 0),
  notifications_count = COALESCE((SELECT count(*) FROM public.notifications n WHERE n.user_id = us.user_id AND n.is_read = false), 0),
  messages_count = COALESCE((SELECT count(*) FROM public.messages m WHERE m.sender_id = us.user_id), 0),
  likes_received = 0,
  profile_views = 0,
  connections_count = COALESCE((SELECT count(*) FROM public.follow_relationships fr WHERE fr.follower_id = us.user_id OR fr.following_id = us.user_id), 0),
  updated_at = now();

commit;