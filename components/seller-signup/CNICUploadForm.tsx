'use client';

import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, X } from 'lucide-react';

interface CNICUploadFormProps {
  onSubmit: (data: CNICData) => Promise<void>;
  isLoading: boolean;
}

export interface CNICData {
  frontImage: string; // base64
  backImage: string; // base64
  cnicNumber: string;
}

export default function CNICUploadForm({ onSubmit, isLoading }: CNICUploadFormProps) {
  const [cnicNumber, setCnicNumber] = useState('');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (side === 'front') {
          setFrontImage(base64);
          setFrontPreview(base64);
        } else {
          setBackImage(base64);
          setBackPreview(base64);
        }
        setError('');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Error reading file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!cnicNumber.trim()) {
      setError('Please enter your CNIC number');
      return;
    }

    if (!frontImage) {
      setError('Please upload CNIC front image');
      return;
    }

    if (!backImage) {
      setError('Please upload CNIC back image');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the terms');
      return;
    }

    try {
      await onSubmit({
        cnicNumber: cnicNumber.trim(),
        frontImage,
        backImage,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit CNIC');
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-50">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Verify Your Identity</h3>
        <p className="text-slate-600">We need your CNIC (Computerized National ID Card) to verify your identity for seller account approval.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* CNIC Number Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            CNIC Number
          </label>
          <input
            type="text"
            placeholder="12345-6789012-3"
            value={cnicNumber}
            onChange={(e) => setCnicNumber(e.target.value)}
            className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl outline-none focus:bg-white transition-all text-sm font-medium"
            style={{ borderColor: 'transparent' }}
            onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
            onBlur={(e) => (e.target.style.borderColor = 'transparent')}
            disabled={isLoading}
          />
          <p className="text-xs text-slate-500">Format: 12345-1234567-8</p>
        </div>

        {/* Front Image Upload */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            CNIC Front Image
          </label>
          <div className="space-y-3">
            {!frontPreview ? (
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, 'front')}
                  className="hidden"
                  disabled={isLoading}
                />
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-yellow-400 hover:bg-yellow-50 transition">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">Click to upload</p>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF (Max 5MB)</p>
                </div>
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border-2 border-green-200 bg-green-50">
                <img src={frontPreview} alt="CNIC Front" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setFrontImage(null);
                    setFrontPreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 right-3 bg-green-500 text-white p-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Image Upload */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            CNIC Back Image
          </label>
          <div className="space-y-3">
            {!backPreview ? (
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, 'back')}
                  className="hidden"
                  disabled={isLoading}
                />
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-yellow-400 hover:bg-yellow-50 transition">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">Click to upload</p>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF (Max 5MB)</p>
                </div>
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border-2 border-green-200 bg-green-50">
                <img src={backPreview} alt="CNIC Back" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setBackImage(null);
                    setBackPreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 right-3 bg-green-500 text-white p-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-5 h-5 mt-1 cursor-pointer"
            disabled={isLoading}
          />
          <label className="text-xs text-slate-600 cursor-pointer flex-1">
            I confirm that the provided CNIC images are clear, valid, and mine. I understand this information will be used for verification purposes only.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !frontImage || !backImage || !cnicNumber}
          className="w-full bg-black py-5 rounded-2xl font-bold text-sm shadow-xl hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ color: '#FFD600' }}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Submit for Verification <i className="fa-solid fa-check"></i>
            </>
          )}
        </button>
      </form>

      <p className="text-[10px] text-center text-slate-400 mt-6 font-medium">
        Your information is secure and will only be used for identity verification.
      </p>
    </div>
  );
}
