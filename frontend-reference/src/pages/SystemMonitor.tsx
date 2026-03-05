import React, { useEffect, useState } from 'react';
import { BrutalCard, SovietButton } from '../components/UI';
import { Activity, Database, Cpu, HardDrive, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const generateData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    cpu: 20 + Math.random() * 40,
    mem: 40 + Math.random() * 20
  }));
};

export const SystemMonitor = () => {
  const [data, setData] = useState(generateData());
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(1), { 
        time: prev[prev.length - 1].time + 1, 
        cpu: 20 + Math.random() * 40,
        mem: 40 + Math.random() * 20
      }]);
    }, 2000);

    fetch('/api/health')
      .then(res => res.json())
      .then(setHealth);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">System Core</h2>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Hardware Telemetry / Node Health</p>
        </div>
        <SovietButton variant="red" className="flex items-center gap-2">
          <AlertTriangle size={18} />
          Global Kill Switch
        </SovietButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BrutalCard title="CPU Load">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <Area type="monotone" dataKey="cpu" stroke="#cc0000" fill="#cc0000" fillOpacity={0.2} />
                <XAxis hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-end mt-2">
            <span className="text-2xl font-black">{Math.round(data[data.length-1].cpu)}%</span>
            <Cpu className="text-red-600 opacity-20" size={32} />
          </div>
        </BrutalCard>

        <BrutalCard title="Memory Usage">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <Area type="monotone" dataKey="mem" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                <XAxis hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-end mt-2">
            <span className="text-2xl font-black">{Math.round(data[data.length-1].mem)}%</span>
            <HardDrive className="text-blue-600 opacity-20" size={32} />
          </div>
        </BrutalCard>

        <BrutalCard title="Database Latency">
          <div className="flex flex-col justify-center h-full gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase opacity-40">PostgreSQL</span>
              <span className="text-sm font-black text-emerald-500">12ms</span>
            </div>
            <div className="w-full bg-white/5 h-2">
              <div className="bg-emerald-500 h-full w-[12%]" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase opacity-40">Redis Cache</span>
              <span className="text-sm font-black text-emerald-500">2ms</span>
            </div>
            <div className="w-full bg-white/5 h-2">
              <div className="bg-emerald-500 h-full w-[2%]" />
            </div>
          </div>
        </BrutalCard>
      </div>

      <BrutalCard title="BullMQ Worker Status">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-4">
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase opacity-40">Active Jobs</div>
            <div className="text-4xl font-black">{health?.queues?.active || 0}</div>
            <div className="w-full bg-white/5 h-4 border border-black">
              <div className="bg-blue-600 h-full w-[30%] animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase opacity-40">Waiting</div>
            <div className="text-4xl font-black">{health?.queues?.waiting || 0}</div>
            <div className="w-full bg-white/5 h-4 border border-black">
              <div className="bg-yellow-600 h-full w-[60%]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase opacity-40">Completed</div>
            <div className="text-4xl font-black text-emerald-500">1,242</div>
            <div className="text-[9px] font-bold opacity-30 uppercase">Last 24 hours</div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase opacity-40">Failed</div>
            <div className="text-4xl font-black text-red-600">0</div>
            <div className="text-[9px] font-bold opacity-30 uppercase">Perfect efficiency</div>
          </div>
        </div>
      </BrutalCard>
    </div>
  );
};
