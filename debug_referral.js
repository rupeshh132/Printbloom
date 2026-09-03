const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
  console.log("=== Debugging Referral System ===");
  
  // 1. Check if RPC function exists
  const { data: rpcTest, error: rpcError } = await supabase.rpc('grant_referral_bonus', { referrer_uuid: '00000000-0000-0000-0000-000000000000' });
  if (rpcError) {
    console.log("RPC Function Error/Status:", rpcError);
  } else {
    console.log("RPC Function exists and is callable by service_role.");
  }

  // 2. Find Anmol's user ID
  const { data: users, error: userError } = await supabase.auth.admin.listUsers();
  if (userError) {
    console.error("Failed to list users:", userError);
    return;
  }
  
  // Sort users by created_at descending to get the newest account
  const sortedUsers = users.users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const newestUser = sortedUsers[0];
  
  if (!newestUser) {
    console.log("No users found.");
    return;
  }
  console.log(`Checking newest user: ${newestUser.email} (${newestUser.id})`);

  // 3. Check Profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', newestUser.id)
    .single();
    
  if (profileError) {
    console.log("Profile Fetch Error:", profileError);
  } else {
    console.log("Anmol's Profile:", profile);
    if (!profile.referred_by) {
      console.log("WARNING: referred_by is NULL. Referral was not captured during signup!");
    } else {
      console.log(`Anmol was referred by: ${profile.referred_by}`);
    }
  }
  
  const { data: ordersData } = await supabase.from('orders').select('*').eq('user_id', newestUser.id);
  const newestOrder = ordersData[0];
  
  if (newestOrder) {
    const { count: exactCount, error: exactCountError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', newestUser.id)
      .eq('payment_status', 'paid')
      .neq('id', newestOrder.id);
      
    console.log(`EXACT COUNT logic result (should be 0 if first order):`, exactCount);
  }

  // 5. Check Admin's reward points
  const adminId = 'a39098cc-8679-4d27-b4ff-61eacabae1f3';
  const { data: adminPoints, error: adminPointsError } = await supabase
    .from('reward_points')
    .select('*')
    .eq('user_id', adminId);
    
  console.log("Admin's reward points:", adminPoints);
}

debug();
