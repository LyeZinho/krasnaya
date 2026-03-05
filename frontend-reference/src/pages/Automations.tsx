import React from 'react';
import { BrutalCard, SovietButton, GlassPanel } from '../components/UI';
import { Plus, Play, Settings2, Trash2, ArrowRight } from 'lucide-react';

const TCA_Node = ({ type, label, description, color }: { type: string, label: string, description: string, color: string }) => (
  <div className="flex items-center gap-4">
    <div className={`w-48 p-4 border-2 border-black bg-[#222] shadow-[4px_4px_0px_#000] relative`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
      <div className="text-[10px] font-black uppercase opacity-40 mb-1">{type}</div>
      <div className="text-xs font-bold uppercase tracking-tight">{label}</div>
      <div className="text-[9px] opacity-30 mt-1 leading-tight">{description}</div>
    </div>
    <ArrowRight size={16} className="text-white/20" />
  </div>
);

export const Automations = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Automation Engine</h2>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Logic Processor / TCA Protocol</p>
        </div>
        <SovietButton className="flex items-center gap-2">
          <Plus size={18} />
          New Protocol
        </SovietButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[600px]">
        {/* Protocol List */}
        <BrutalCard title="Active Protocols" className="lg:col-span-1 overflow-y-auto">
          <div className="space-y-2">
            {['Welcome_Msg', 'Auto_Mod_Lvl1', 'Level_Up_Alert', 'Economy_Sync'].map((p, i) => (
              <div key={p} className={`p-3 border-2 border-black cursor-pointer transition-all ${i === 0 ? 'bg-red-600 text-white' : 'bg-white/5 hover:bg-white/10'}`}>
                <div className="text-xs font-black uppercase tracking-tighter">{p}</div>
                <div className="text-[9px] opacity-60 mt-1">Last run: 2m ago</div>
              </div>
            ))}
          </div>
        </BrutalCard>

        {/* Visual Builder Canvas */}
        <div className="lg:col-span-2 brutal-card bg-[#0a0a0a] relative overflow-hidden flex flex-col">
          <div className="p-4 border-b-2 border-black/20 flex justify-between items-center bg-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Canvas: Welcome_Msg</span>
            <div className="flex gap-2">
              <Play size={14} className="text-emerald-500 cursor-pointer" />
              <Settings2 size={14} className="opacity-30 cursor-pointer" />
              <Trash2 size={14} className="text-red-500 cursor-pointer" />
            </div>
          </div>
          
          <div className="flex-1 p-12 flex flex-col items-center justify-center gap-8">
            <TCA_Node 
              type="Trigger" 
              label="On Member Join" 
              description="Fires when a new comrade enters the server."
              color="bg-blue-500"
            />
            <TCA_Node 
              type="Condition" 
              label="Account Age > 7d" 
              description="Verify the loyalty of the newcomer."
              color="bg-yellow-500"
            />
            <TCA_Node 
              type="Action" 
              label="Send Welcome Embed" 
              description="Dispatch greeting to #general."
              color="bg-emerald-500"
            />
            
            <div className="w-48 p-4 border-2 border-dashed border-white/10 flex items-center justify-center text-[10px] font-bold opacity-20 uppercase">
              + Add Component
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <GlassPanel className="lg:col-span-1 border-l-4 border-black">
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-white/10 pb-2">Node Config</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase opacity-40 block mb-1">Action Type</label>
                <select className="w-full bg-black border-2 border-white/10 p-2 text-xs font-bold uppercase">
                  <option>SEND_MESSAGE</option>
                  <option>ADD_ROLE</option>
                  <option>KICK_USER</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase opacity-40 block mb-1">Target Channel</label>
                <input type="text" placeholder="#general" className="w-full bg-black border-2 border-white/10 p-2 text-xs font-bold" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase opacity-40 block mb-1">Message Template</label>
                <textarea 
                  className="w-full bg-black border-2 border-white/10 p-2 text-xs font-bold h-32"
                  placeholder="Welcome {user} to the glorious server!"
                />
              </div>

              <SovietButton className="w-full">Save Changes</SovietButton>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
