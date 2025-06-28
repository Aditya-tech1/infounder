const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY, 
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const BUCKET_NAME = 'pitch-uploads';

exports.uploadToSupabase = async (file) => {
  try {
    const sanitizedName = file.originalname.replace(/[^a-z0-9_.-]/gi, '_');
    const fileName = `${Date.now()}-${uuidv4()}-${sanitizedName}`;
    
    console.log(`Uploading file: ${fileName} (${file.mimetype}, ${file.size} bytes)`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
        cacheControl: '3600'
      });
    
    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Supabase upload failed: ${error.message}`);
    }
    
    const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;
    console.log(`Upload successful: ${url}`);
    
    return url;
  } catch (error) {
    console.error('File upload failed:', error);
    throw new Error('File upload failed: ' + error.message);
  }
};