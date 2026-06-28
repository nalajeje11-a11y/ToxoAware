import "react";
import {
  XCircle,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  Sparkles,
} from "lucide-react";

const mitosFaktaData = [
  {
    mitos: "Semua kucing menularkan toksoplasmosis",
    fakta:
      "Tidak semua kucing membawa parasit. Risiko tinggi jika kotoran kucing terkontaminasi dan tidak dibersihkan dengan benar.",
  },
  {
    mitos: "Toksoplasmosis selalu berbahaya",
    fakta:
      "Pada orang sehat, infeksi biasanya asimtomatik atau ringan. Bahaya utama adalah untuk ibu hamil dan immunocompromised.",
  },
  {
    mitos: "Menyentuh kucing akan tertular toksoplasmosis",
    fakta:
      "Toksoplasmosis tidak ditularkan melalui kontak langsung. Penularan terjadi melalui kotoran, makanan tercemar, atau transplasental.",
  },
  {
    mitos: "Ibu hamil harus menjauh dari kucing",
    fakta:
      "Ibu hamil boleh memiliki kucing, tetapi harus menghindari membersihkan kotak pasir dan cuci tangan setelah kontak.",
  },
];

const funFactsData = [
  {
    title: "Seksual di Usus Kucing",
    description:
      "Kucing adalah satu-satunya inang definitif di mana parasit Toxoplasma dapat menyelesaikan siklus hidupnya secara seksual dan menghasilkan oosit.",
  },
  {
    title: "Manipulasi Pikiran Inang",
    description:
      "Studi menunjukkan bahwa toksoplasmosis dapat mempengaruhi perilaku pada tikus, membuat mereka lebih berani mendekati kucing (host predator).",
  },
  {
    title: "Super Bertahan Hidup",
    description:
      "Oosit yang disporulasi dapat tetap virulen di tanah yang lembab selama berbulan-bulan bahkan hingga bertahun-tahun lamanya.",
  },
  {
    title: "1/3 Penduduk Bumi Terinfeksi",
    description:
      "Data WHO menunjukkan bahwa sepertiga populasi dunia memiliki antibodi anti-Toxoplasma, tetapi kebanyakan tidak menunjukkan gejala sama sekali.",
  },
];

export default function Edukasi() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 md:pb-8">
      <div className="bg-[#FF90E8] border-4 border-black p-8 md:p-12 text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-50 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black text-sm font-black uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen size={18} strokeWidth={3} /> PUSAT PENGETAHUAN
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-none uppercase tracking-tight">
              EDUKASI & BERITA
              <br />
              TOXOAWARE.
            </h2>
            <p className="text-black font-bold max-w-lg text-lg leading-relaxed border-l-4 border-black pl-4">
              Pelajari fakta medis yang sebenarnya, patahkan mitos yang beredar,
              dan kenali musuh mikroskopis ini lebih dekat.
            </p>
          </div>
          <div className="hidden md:flex w-32 h-32 bg-white border-4 border-black items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform">
            <Sparkles size={64} className="text-black" strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 border-b-4 border-black pb-4">
          <div className="w-12 h-12 bg-[#FFC900] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <XCircle size={28} className="text-black" strokeWidth={3} />
          </div>
          <h3 className="text-3xl font-black text-black uppercase">
            Mitos vs Fakta
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mitosFaktaData.map((item, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="p-6 bg-white border-b-4 border-black flex gap-4">
                <div className="mt-1 shrink-0">
                  <XCircle className="text-black" size={28} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-black font-black text-sm uppercase tracking-widest mb-2 bg-[#FF90E8] border-2 border-black inline-block px-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Mitos
                  </h4>
                  <p className="text-black font-bold text-lg leading-snug">
                    {item.mitos}
                  </p>
                </div>
              </div>
              <div className="p-6 bg-[#23A094] flex gap-4 flex-1">
                <div className="mt-1 shrink-0">
                  <CheckCircle2
                    className="text-white"
                    size={28}
                    strokeWidth={3}
                  />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest mb-2 bg-black border-2 border-white inline-block px-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    Fakta Medis
                  </h4>
                  <p className="text-white font-bold leading-relaxed">
                    {item.fakta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-8">
        <div className="flex items-center gap-4 border-b-4 border-black pb-4">
          <div className="w-12 h-12 bg-[#C4A1FF] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Lightbulb size={28} className="text-black" strokeWidth={3} />
          </div>
          <h3 className="text-3xl font-black text-black uppercase">
            Tahukah Anda?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {funFactsData.map((fact, index) => (
            <div
              key={index}
              className="bg-black border-4 border-black p-6 hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(196,161,255,1)] flex flex-col"
            >
              <div className="w-14 h-14 bg-[#C4A1FF] border-2 border-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Lightbulb size={28} className="text-black" strokeWidth={3} />
              </div>

              <h4 className="text-white font-black text-xl mb-3 uppercase leading-none border-b-2 border-white pb-2">
                {fact.title}
              </h4>
              <p className="text-white font-bold text-sm leading-relaxed flex-1">
                {fact.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
