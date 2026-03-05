import React, { useEffect, useState } from 'react';
import { BrutalCard, SovietButton } from '../components/UI';
import { MessageSquare, Users, Terminal, Zap, Activity } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { format } from 'date-fns';

const data = [
  { name: '00:00', val: 400 },
  { name: '04:00', val: 300 },
  { name: '08:00', val: 600 },
  { name: '12:00', val: 800 },
  { name: '16:00', val: 500 },
  { name: '20:00', val: 900 },
];

export const Dashboard = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({
    messages: 12450,
    xp: 89200,
    commands: 452,
    uptime: '14d 2h 12m'
  });

  useEffect(() => {
    const eventSource = new EventSource('/api/events/stream');
    
    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type !== 'connected') {
        setEvents(prev => [data, ...prev].slice(0, 10));
      }
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Central Command</h2>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Sector 7G / Moscow Node</p>
        </div>
        <div className="flex gap-4">
          <SovietButton>Export Ledger</SovietButton>
          <SovietButton variant="red">Emergency Stop</SovietButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <BrutalCard title="Messages Processed">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">{stats.messages.toLocaleString()}</span>
            <MessageSquare className="text-red-600" />
          </div>
          <div className="text-[10px] text-emerald-500 font-bold">+12% from yesterday</div>
        </BrutalCard>
        <BrutalCard title="Total Server XP">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">{stats.xp.toLocaleString()}</span>
            <Zap className="text-yellow-500" />
          </div>
          <div className="text-[10px] text-emerald-500 font-bold">+5.4k this hour</div>
        </BrutalCard>
        <BrutalCard title="Commands Executed">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">{stats.commands}</span>
            <Terminal className="text-blue-500" />
          </div>
          <div className="text-[10px] text-white/20 font-bold">Stable load</div>
        </BrutalCard>
        <BrutalCard title="System Uptime">
          <div className="flex items-center justify-between">
            <span className="text-xl font-black uppercase">{stats.uptime}</span>
            <Activity className="text-emerald-500" />
          </div>
          <div className="text-[10px] text-white/20 font-bold">Node: AIS-PRE-01</div>
        </BrutalCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <BrutalCard title="Load Distribution" className="lg:col-span-2">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '2px solid #333', fontSize: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="val" fill="#cc0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BrutalCard>

        {/* Real-time Ledger */}
        <BrutalCard title="Live Event Ledger">
          <div className="space-y-4 overflow-hidden">
            {events.length === 0 && (
              <div className="py-8 text-center text-white/20 text-xs font-bold uppercase animate-pulse">
                Waiting for telemetry...
              </div>
            )}
            {events.map((event) => (
              <div key={event.id} className="border-l-2 border-red-600 pl-3 py-1 group cursor-default">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">
                    {event.type}
                  </span>
                  <span className="text-[9px] opacity-30">
                    {format(new Date(event.timestamp), 'HH:mm:ss')}
                  </span>
                </div>
                <div className="text-xs font-medium text-white/80">
                  <span className="text-white/40 mr-2">[{event.data.user}]</span>
                  {event.data.content}
                </div>
              </div>
            ))}
          </div>
        </BrutalCard>
      </div>
    </div>
  );
};
