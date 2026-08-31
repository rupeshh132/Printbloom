const fs = require('fs');
let code = fs.readFileSync('app/cart/page.tsx', 'utf8');

const oldOnSubmit = `onSubmit={async (e) => { 
                      e.preventDefault(); 
                      try {
                        const formData = new FormData(e.currentTarget);
                        const { saveFollowUpLead } = await import("@/app/actions/follow-ups")
                        await saveFollowUpLead(formData.get("full_name") as string, formData.get("phone_number") as string, orderTotal)
                      } catch(err) { console.error(err) }
                      setCurrentStep("payment"); 
                    }}`;

// Just in case the formatting is different, I will do a regex replacement or simpler string replace
// Since I know exactly what it looks like from the log:
/*
                    <form className="space-y-5" onSubmit={async (e) => { 
                      e.preventDefault(); 
                      try {
                        const formData = new FormData(e.currentTarget);
                        const { saveFollowUpLead } = await import("@/app/actions/follow-ups")
                        await saveFollowUpLead(formData.get("full_name") as string, formData.get("phone_number") as string, orderTotal)
                      } catch(err) { console.error(err) }
                      setCurrentStep("payment"); 
                    }}>
*/
// It uses `orderTotal` which might be undefined in that scope! Wait, orderTotal is calculated inside handlePayment!
// Let's replace the form tag entirely.

let newFormStart = `<form className="space-y-5" onSubmit={async (e) => { 
                      e.preventDefault(); 
                      try {
                        const formData = new FormData(e.currentTarget);
                        
                        // Save address to DB if logged in
                        const { data: { session } } = await supabase.auth.getSession();
                        if (session?.user) {
                          const { data, error } = await supabase.from('addresses').insert({
                            user_id: session.user.id,
                            full_name: formData.get("full_name"),
                            phone_number: formData.get("phone_number"),
                            pincode: formData.get("pincode"),
                            address_line_1: formData.get("address_line_1"),
                            address_line_2: formData.get("address_line_2"),
                            city: formData.get("city"),
                            state: formData.get("state"),
                            is_default: true
                          }).select().single();
                          
                          if (data) {
                            setSavedAddresses(prev => [data, ...prev]);
                            setSelectedAddressId(data.id);
                            setShowNewAddressForm(false);
                          } else {
                            // Fallback if error
                            setSelectedAddressId("temp-id");
                          }
                        } else {
                          // Allow guest to proceed to next step (will be prompted to login at payment)
                          setSelectedAddressId("temp-id");
                        }

                        const { saveFollowUpLead } = await import("@/app/actions/follow-ups")
                        await saveFollowUpLead(formData.get("full_name") as string, formData.get("phone_number") as string, total)
                      } catch(err) { console.error(err) }
                      setCurrentStep("payment"); 
                    }}>`;

code = code.replace(/<form className="space-y-5" onSubmit=\{async[\s\S]*?setCurrentStep\("payment"\);\s*\}\}>/, newFormStart);

fs.writeFileSync('app/cart/page.tsx', code);
console.log('Fixed address form submission');
