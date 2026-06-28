import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import {
  Camera,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Scanner() {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [facingMode, setFacingMode] = useState("environment");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setPreviewImage(imageSrc);
    setIsScanning(true);

    try {
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const formData = new FormData();
      formData.append("image", blob, "scan.jpg");

      const response = await fetch("https://api.ocuscan.my.id/api/scan-meat", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsScanning(false);
    }
  }, [webcamRef]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setIsScanning(true);

    try {
      const formData = new FormData();
      formData.append("image", file, file.name);

      const response = await fetch("https://api.ocuscan.my.id/api/scan-meat", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setResult(null);
    setPreviewImage(null);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col h-[100dvh] w-screen overflow-hidden selection:bg-black selection:text-white">
      {/* Neo-brutalism Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-4 md:p-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 md:w-12 md:h-12 bg-[#FF90E8] border-2 md:border-4 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 md:active:translate-x-1 md:active:translate-y-1 transition-all"
        >
          <ArrowLeft size={20} strokeWidth={3} className="md:w-6 md:h-6" />
        </button>

        <div className="flex flex-col items-end gap-2">
          <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white border-2 md:border-4 border-black text-black text-[10px] md:text-sm font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse border border-black"></span>
            AI Vision Live
          </div>

          {!result && (
            <div className="max-w-[200px] md:max-w-[280px] bg-[#FFC900] border-2 md:border-4 border-black p-2 md:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[8px] md:text-[10px] font-bold text-black leading-tight uppercase">
                ‼️Disclaimer: Pemindaian ini hanya bersifat informatif
                berdasarkan tampilan visual daging dan bukan pemeriksaan
                langsung terhadap parasit Toxoplasma gondii.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex-1 bg-black">
        {!previewImage && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
          />
        )}

        {/* Overlay Grid for Neo-brutalism feel */}
        {!result && (
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
        )}

        {result && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-4 md:p-6 animate-in fade-in zoom-in duration-300 backdrop-blur-sm bg-black/40 overflow-y-auto">
            <div
              className={`w-full max-w-sm border-2 md:border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] my-auto ${result.safe_to_eat ? "bg-[#23A094]" : "bg-[#FF90E8]"}`}
            >
              <div className="flex justify-center mb-4 md:mb-6">
                {result.safe_to_eat ? (
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white border-2 md:border-4 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle
                      size={40}
                      strokeWidth={3}
                      className="md:w-12 md:h-12"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white border-2 md:border-4 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <AlertTriangle
                      size={40}
                      strokeWidth={3}
                      className="md:w-12 md:h-12"
                    />
                  </div>
                )}
              </div>

              <div className="bg-white border-2 md:border-4 border-black p-3 md:p-4 mb-4 md:mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl md:text-3xl font-black text-black text-center uppercase tracking-tight mb-2">
                  {result.doneness}
                </h2>
                <p className="text-center font-bold text-xs md:text-sm text-black uppercase border-t-2 md:border-t-4 border-black pt-2">
                  {result.safe_to_eat
                    ? "Aman dan siap untuk anda konsumsi!"
                    : "Belum aman! Masak lebih matang."}
                </p>
              </div>

              <div className="flex justify-between items-center bg-black text-white p-3 md:p-4 mb-6 md:mb-8 border-2 md:border-4 border-black font-black uppercase text-xs md:text-sm">
                <span>Akurasi AI</span>
                <span>{result.confidence}%</span>
              </div>
              <button
                onClick={resetScan}
                className="w-full py-3 md:py-4 bg-[#FFC900] border-2 md:border-4 border-black hover:bg-white text-black font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 md:active:translate-x-1 md:active:translate-y-1 text-sm md:text-base"
              >
                PINDAI ULANG
              </button>
            </div>
          </div>
        )}

        {!result && !isScanning && (
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            <div className="relative w-56 h-56 md:w-72 md:h-72 border-2 md:border-4 border-white mb-20 md:mb-0">
              <div className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-4 h-4 md:w-6 md:h-6 bg-[#FF90E8] border border-black md:border-2"></div>
              <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-[#23A094] border border-black md:border-2"></div>
              <div className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 w-4 h-4 md:w-6 md:h-6 bg-[#FFC900] border border-black md:border-2"></div>
              <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-[#C4A1FF] border border-black md:border-2"></div>
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {!result && (
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-28 md:pb-12 bg-gradient-to-t from-black via-black/90 to-transparent flex justify-center items-end gap-6 md:gap-8 z-20">
          <button
            onClick={toggleCamera}
            className="w-12 h-12 md:w-14 md:h-14 bg-white border-2 md:border-4 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 md:active:translate-x-1 md:active:translate-y-1 transition-all absolute left-6 bottom-28 md:left-8 md:bottom-12"
          >
            <RefreshCw size={20} strokeWidth={3} className="md:w-6 md:h-6" />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            disabled={isScanning}
            className="w-14 h-14 md:w-16 md:h-16 bg-[#C4A1FF] border-2 md:border-4 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 md:active:translate-x-1 md:active:translate-y-1 transition-all disabled:opacity-50"
          >
            <ImageIcon size={24} strokeWidth={3} className="md:w-7 md:h-7" />
          </button>

          <button
            onClick={capture}
            disabled={isScanning}
            className="w-20 h-20 md:w-24 md:h-24 bg-[#FF90E8] border-2 md:border-4 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 md:active:translate-x-2 md:active:translate-y-2 transition-all disabled:opacity-50"
          >
            {isScanning ? (
              <Loader2
                size={32}
                className="animate-spin md:w-10 md:h-10"
                strokeWidth={3}
              />
            ) : (
              <Camera size={32} strokeWidth={3} className="md:w-10 md:h-10" />
            )}
          </button>

          <div className="w-14 h-14 md:w-16 md:h-16"></div>
        </div>
      )}
    </div>
  );
}
