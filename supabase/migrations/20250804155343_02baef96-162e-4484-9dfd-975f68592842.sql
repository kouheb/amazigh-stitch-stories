-- Add missing INSERT policy for notifications
CREATE POLICY "Users can insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add missing DELETE policy for notifications  
CREATE POLICY "Users can delete their own notifications" 
ON public.notifications 
FOR DELETE 
USING (auth.uid() = user_id);