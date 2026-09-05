"use client"

import * as React from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { updateEnquiryStatus } from "@/app/actions/enquiries"
import { CopyUploadLink } from "@/components/admin/copy-upload-link"
import { WhatsAppButton } from "@/components/admin/whatsapp-button"
import { Calendar, Tag } from "lucide-react"

const COLUMNS = [
  { id: "new", title: "New", color: "bg-[#DFBC94]/20 border-[#DFBC94]/30 text-[#8B6B43]" },
  { id: "contacted", title: "Contacted", color: "bg-[#E6E0D8] border-[#D0C6B8] text-[#6D635B]" },
  { id: "converted", title: "Converted", color: "bg-[#E2E8DD] border-[#C3D4BA] text-[#4B6B4F]" },
  { id: "closed", title: "Closed", color: "bg-[#F5F0E8] border-[#E0D9CF] text-[#9A8F85]" }
]

export function EnquiriesKanban({ initialEnquiries, flipbooks = [] }: { initialEnquiries: any[], flipbooks?: any[] }) {
  const [data, setData] = React.useState<{ [key: string]: any[] }>({
    new: [],
    contacted: [],
    converted: [],
    closed: []
  })

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const grouped: Record<string, any[]> = {
      new: [],
      contacted: [],
      converted: [],
      closed: []
    }
    
    // Safety fallback for unexpected statuses
    initialEnquiries.forEach(enq => {
      const status = enq.status || "new"
      if (grouped[status as keyof typeof grouped]) {
        grouped[status as keyof typeof grouped].push(enq)
      } else {
        grouped.new.push(enq)
      }
    })
    
    setData(grouped)
    setMounted(true)
  }, [initialEnquiries])

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result
    
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Optimistic UI update
    const sourceCol = source.droppableId
    const destCol = destination.droppableId

    const sourceItems = [...data[sourceCol]]
    const destItems = sourceCol === destCol ? sourceItems : [...data[destCol]]
    
    const [movedItem] = sourceItems.splice(source.index, 1)
    movedItem.status = destCol
    destItems.splice(destination.index, 0, movedItem)

    setData(prev => ({
      ...prev,
      [sourceCol]: sourceItems,
      [destCol]: destItems
    }))

    // Server update
    try {
      await updateEnquiryStatus(draggableId, destCol)
    } catch (e) {
      console.error("Failed to update status", e)
      // On failure, page revalidation from other actions will fix it
    }
  }

  if (!mounted) return null

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-200px)] min-h-[600px] snap-x snap-mandatory">
        {COLUMNS.map(col => (
          <div key={col.id} className="min-w-[320px] w-[320px] flex-shrink-0 bg-[#FBF6EE] rounded-sm border border-[#E0D9CF] flex flex-col snap-start">
            <div className={`p-3 border-b flex justify-between items-center ${col.color}`}>
              <h3 className="font-mono text-xs uppercase tracking-widest font-semibold">{col.title}</h3>
              <span className="text-xs bg-white/50 px-2 py-0.5 rounded-full">{data[col.id].length}</span>
            </div>
            
            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className={`flex-1 p-3 flex flex-col gap-3 overflow-y-auto ${snapshot.isDraggingOver ? 'bg-black/5' : ''}`}
                >
                  {data[col.id].map((enq, index) => (
                    <Draggable key={enq.id} draggableId={enq.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white p-4 rounded-sm border shadow-sm flex flex-col gap-3 transition-transform ${snapshot.isDragging ? 'rotate-2 scale-105 border-[#DFBC94]' : 'border-[#E0D9CF]'}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-[#221F1C] leading-none mb-1">{enq.name}</h4>
                              <p className="text-[10px] uppercase text-[#9A8F85] tracking-wider">
                                {new Date(enq.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                              </p>
                            </div>
                            <WhatsAppButton 
                              phone={enq.whatsapp || enq.phone || ""} 
                              customerName={enq.name} 
                              flipbookLink={flipbooks?.find(fb => fb.enquiry_token === enq.upload_token)?.id ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://printbloom.vercel.app'}/flipbook/${flipbooks.find(fb => fb.enquiry_token === enq.upload_token)!.id}` : ""}
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-start gap-2 text-xs text-[#6D635B]">
                              <Tag className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-2">
                                {enq.enquiry_items?.[0]?.products?.name ?? "Unknown"} 
                                {enq.enquiry_items?.[0]?.variant_label && ` (${enq.enquiry_items[0].variant_label})`}
                              </span>
                            </div>
                            {enq.occasion && (
                              <div className="flex items-center gap-2 text-xs text-[#6D635B]">
                                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{enq.occasion}</span>
                              </div>
                            )}
                          </div>

                          <div className="pt-3 border-t border-[#E0D9CF] mt-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] uppercase tracking-wider text-[#9A8F85]">
                                Upload: <span className={enq.upload_status === 'completed' ? 'text-green-600 font-medium' : ''}>{enq.upload_status || 'pending'}</span>
                              </span>
                              <CopyUploadLink token={enq.upload_token} />
                            </div>
                            
                            {enq.upload_status === "completed" && (
                              <a 
                                href={`/admin/enquiries/${enq.upload_token}`}
                                className="block w-full text-xs bg-[#4B6B4F] text-white text-center py-2 rounded-sm hover:bg-[#3A533D] transition-colors"
                              >
                                View Photos & Captions
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
