-- 1. Create the notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Node',
  content TEXT DEFAULT '',
  is_private BOOLEAN DEFAULT FALSE,
  color TEXT DEFAULT 'bg-surface text-foreground',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Turn on Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Users can only select their own notes
CREATE POLICY "Users can view own notes" ON notes 
  FOR SELECT USING (auth.uid() = user_id);

-- 4. Policy: Users can only insert their own notes
CREATE POLICY "Users can insert own notes" ON notes 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Policy: Users can only update their own notes
CREATE POLICY "Users can update own notes" ON notes 
  FOR UPDATE USING (auth.uid() = user_id);

-- 6. Policy: Users can only delete their own notes
CREATE POLICY "Users can delete own notes" ON notes 
  FOR DELETE USING (auth.uid() = user_id);
