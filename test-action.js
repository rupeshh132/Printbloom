const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://tsapvtouowvsjdlpvydj.supabase.co';
const supabaseKey = 'sb_publishable_dYoeEhaaq2SSoB6plvTUOQ_HBJzvBEM';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testAction() {
  const name = "User Real Name";
  const product = "custom-magazine-a4";
  const occasion = "Anniversary";
  const requiredBy = "";
  const notes = "Testing form submission";
  const pages = "12";

  const { data: enquiry, error } = await supabase
    .from("enquiries")
    .insert({
      name,
      occasion,
      required_by: requiredBy || null,
      notes: notes || null,
      preferred_contact: "whatsapp",
      status: "new",
    })
    .select()
    .single();

  if (error || !enquiry) {
    console.error("Enquiry save error:", error);
    return;
  }
  console.log("Enquiry created:", enquiry.id);

  const { data: productData } = await supabase
    .from("products")
    .select("id")
    .eq("slug", product)
    .single();

  if (productData) {
    const { error: itemError } = await supabase.from("enquiry_items").insert({
      enquiry_id: enquiry.id,
      product_id: productData.id,
      variant_label: pages ? `${pages} Pages` : null,
      quantity: 1,
    });
    if (itemError) console.error("Item save error:", itemError);
    else console.log("Enquiry item created!");
  }
}

testAction();
