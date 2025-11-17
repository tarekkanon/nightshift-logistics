import React, { useState, useEffect, useRef } from 'react';
import {
  Truck, Plus, Clock, Check, AlertCircle, Camera, Edit, Fuel,
  Wifi, WifiOff, LogOut, X, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface Action {
  type: string;
  timestamp: string;
  note: string;
  km: number | null;
  comments: string;
}

interface Photo {
  timestamp: string;
  data: string;
}

interface Delivery {
  id: string;
  status: 'created' | 'picked_up' | 'waiting' | 'completed';
  createdAt: string;
  actions: Action[];
  kmPickup: number | null;
  kmDelivery: number | null;
  photos: Photo[];
  signature: string | null;
}

interface ActionData {
  km: string;
  comments: string;
}

export default function DriverAppPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState<any[]>([]);

  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionData, setActionData] = useState<ActionData>({ km: '', comments: '' });

  const [isSignaturePad, setIsSignaturePad] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const STORAGE_KEY = 'nightshift_deliveries';
  const SYNC_KEY = 'nightshift_pending_sync';
  const CORRECT_PIN = '1234';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NightShift Driver App",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Android, iOS",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "AED"
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('nightshift_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setDeliveries(JSON.parse(stored));
    }

    const pending = localStorage.getItem(SYNC_KEY);
    if (pending) {
      setPendingSync(JSON.parse(pending));
    }

    const handleOnline = () => {
      setIsOnline(true);
      syncPendingData();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogin = () => {
    if (pin === CORRECT_PIN) {
      setIsAuthenticated(true);
      localStorage.setItem('nightshift_auth', 'true');
      setPin('');
    } else {
      alert('Incorrect PIN');
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nightshift_auth');
  };

  const syncPendingData = () => {
    console.log('Syncing pending data...', pendingSync);
    setPendingSync([]);
    localStorage.removeItem(SYNC_KEY);
  };

  const saveDeliveries = (newDeliveries: Delivery[]) => {
    setDeliveries(newDeliveries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDeliveries));

    if (!isOnline) {
      const newPending = [...pendingSync, { type: 'delivery_update', timestamp: Date.now(), data: newDeliveries }];
      setPendingSync(newPending);
      localStorage.setItem(SYNC_KEY, JSON.stringify(newPending));
    }
  };

  const generateDeliveryId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `NS${timestamp}${random}`;
  };

  const createNewDelivery = () => {
    const newDelivery: Delivery = {
      id: generateDeliveryId(),
      status: 'created',
      createdAt: new Date().toISOString(),
      actions: [
        {
          type: 'created',
          timestamp: new Date().toISOString(),
          note: 'Delivery created',
          km: null,
          comments: ''
        }
      ],
      kmPickup: null,
      kmDelivery: null,
      photos: [],
      signature: null
    };

    const updated = [...deliveries, newDelivery];
    saveDeliveries(updated);
    setSelectedDelivery(newDelivery);
    setCurrentView('detail');
  };

  const openActionModal = (type: string) => {
    setActionType(type);
    setActionData({ km: '', comments: '' });
    setShowActionModal(true);
  };

  const submitAction = () => {
    const kmValue = actionData.km ? parseFloat(actionData.km) : null;
    const comments = actionData.comments.trim();

    if (actionType === 'pickup_confirmed' || actionType === 'delivery_completed') {
      const actionName = actionType === 'pickup_confirmed' ? 'CONFIRM PICKUP' : 'COMPLETE DELIVERY';

      let confirmMessage = `Are you sure you want to ${actionName}?`;

      if (kmValue) {
        confirmMessage += `\n\nKM Reading: ${kmValue}`;
      }

      if (comments) {
        confirmMessage += `\n\nNotes: ${comments}`;
      }

      confirmMessage += `\n\nThis action cannot be undone.`;

      const userConfirmed = window.confirm(confirmMessage);

      if (!userConfirmed) {
        return;
      }
    }

    if (selectedDelivery) {
      logAction(selectedDelivery.id, actionType, comments, kmValue);
      setShowActionModal(false);
      setActionData({ km: '', comments: '' });
    }
  };

  const logAction = (deliveryId: string, actionType: string, comments = '', kmValue: number | null = null, photoData: string | null = null, signatureData: string | null = null) => {
    const updated = deliveries.map(d => {
      if (d.id === deliveryId) {
        const newAction: Action = {
          type: actionType,
          timestamp: new Date().toISOString(),
          note: comments || getDefaultNote(actionType),
          km: kmValue,
          comments: comments
        };

        const updatedDelivery: Delivery = {
          ...d,
          actions: [...d.actions, newAction]
        };

        if (actionType === 'pickup_confirmed') {
          updatedDelivery.status = 'picked_up';
          if (kmValue !== null) updatedDelivery.kmPickup = kmValue;
        } else if (actionType === 'delivery_completed') {
          updatedDelivery.status = 'completed';
          if (kmValue !== null) updatedDelivery.kmDelivery = kmValue;
        } else if (actionType === 'waiting_start') {
          updatedDelivery.status = 'waiting';
        } else if (actionType === 'waiting_end') {
          updatedDelivery.status = d.status === 'waiting' ? 'picked_up' : d.status;
        }

        if (photoData) {
          updatedDelivery.photos = [...(d.photos || []), { timestamp: new Date().toISOString(), data: photoData }];
        }

        if (signatureData) {
          updatedDelivery.signature = signatureData;
        }

        return updatedDelivery;
      }
      return d;
    });

    saveDeliveries(updated);
    setSelectedDelivery(updated.find(d => d.id === deliveryId) || null);
  };

  const getDefaultNote = (type: string) => {
    const notes: Record<string, string> = {
      pickup_confirmed: 'Pickup confirmed',
      delivery_completed: 'Delivery completed',
      waiting_start: 'Waiting period started',
      waiting_end: 'Waiting period ended',
      issue: 'Issue reported',
      fuel_stop: 'Fuel stop',
      photo_captured: 'Proof of delivery photo',
      signature_captured: 'Customer signature'
    };
    return notes[type] || type;
  };

  const getActionLabel = (type: string) => {
    const labels: Record<string, string> = {
      pickup_confirmed: 'Confirm Pickup',
      delivery_completed: 'Complete Delivery',
      waiting_start: 'Start Waiting',
      waiting_end: 'End Waiting',
      issue: 'Log Issue/Delay',
      fuel_stop: 'Fuel Stop'
    };
    return labels[type] || type;
  };

  const capturePhoto = (deliveryId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';

    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          logAction(deliveryId, 'photo_captured', 'Proof of delivery photo', null, event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = (deliveryId: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL();
    logAction(deliveryId, 'signature_captured', 'Customer signature', null, null, signatureData);
    setIsSignaturePad(false);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      created: 'bg-gray-500',
      picked_up: 'bg-blue-500',
      waiting: 'bg-yellow-500',
      completed: 'bg-green-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      created: 'Created',
      picked_up: 'Picked Up',
      waiting: 'Waiting',
      completed: 'Completed'
    };
    return texts[status] || status;
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <>
        <SEO
          title="Driver App - Delivery Logger | NightShift Logistics"
          description="NightShift driver app for real-time delivery tracking and logging. Secure driver portal."
          keywords="delivery driver app Dubai, logistics tracking app, driver delivery app UAE"
          canonical="https://night-shiftlogistics.com/driver-app"
          structuredData={structuredData}
        />

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-cyan-400/30 shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-xl">
                <Truck className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white text-center mb-2">NightShift Driver</h1>
            <p className="text-cyan-300 text-center mb-8">Delivery Logger</p>
            <div className="space-y-4">
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">Enter PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="••••"
                  maxLength={4}
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Action Modal
  if (showActionModal && selectedDelivery) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl max-w-md w-full border border-cyan-400/30 shadow-2xl">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{getActionLabel(actionType)}</h2>
            <button
              onClick={() => setShowActionModal(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-cyan-300 font-semibold mb-2">
                KM Reading <span className="text-slate-500 text-sm font-normal">(optional)</span>
              </label>
              <input
                type="number"
                step="0.1"
                inputMode="decimal"
                value={actionData.km}
                onChange={(e) => setActionData({ ...actionData, km: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Enter KM reading"
              />
            </div>
            <div>
              <label className="block text-cyan-300 font-semibold mb-2">
                Comments/Notes <span className="text-slate-500 text-sm font-normal">(optional)</span>
              </label>
              <textarea
                value={actionData.comments}
                onChange={(e) => setActionData({ ...actionData, comments: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[100px]"
                placeholder="Add any notes, location details, or observations..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={submitAction}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Log Action
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signature Pad
  if (isSignaturePad && selectedDelivery) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col">
        <div className="bg-slate-800 p-4 flex justify-between items-center">
          <h2 className="text-white font-bold">Customer Signature</h2>
          <button
            onClick={() => setIsSignaturePad(false)}
            className="text-white"
          >
            Cancel
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="border-2 border-slate-300 rounded touch-none w-full"
              style={{ touchAction: 'none' }}
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={clearSignature}
              className="bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Clear
            </button>
            <button
              onClick={() => saveSignature(selectedDelivery.id)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Save Signature
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Detail View
  if (currentView === 'detail' && selectedDelivery) {
    return (
      <>
        <SEO
          title={`Delivery ${selectedDelivery.id} | NightShift Driver`}
          description="NightShift driver delivery details"
          keywords="delivery tracking, driver app"
          canonical="https://night-shiftlogistics.com/driver-app"
          structuredData={structuredData}
        />

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="bg-slate-800 border-b border-cyan-400/30 p-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('list')}
                className="text-cyan-300 font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="w-5 h-5 text-green-400" />
                ) : (
                  <WifiOff className="w-5 h-5 text-yellow-400" />
                )}
              </div>
            </div>
            <div className="mt-3">
              <h1 className="text-xl font-bold text-white">{selectedDelivery.id}</h1>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mt-2 ${getStatusColor(selectedDelivery.status)}`}>
                {getStatusText(selectedDelivery.status)}
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4 pb-24">
            {/* Quick Actions */}
            <div className="bg-slate-800 rounded-xl p-4 border border-cyan-400/20">
              <h3 className="text-cyan-300 font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedDelivery.status !== 'completed' && (
                  <>
                    {selectedDelivery.status === 'created' && (
                      <button
                        onClick={() => openActionModal('pickup_confirmed')}
                        className="bg-blue-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" /> Confirm Pickup
                      </button>
                    )}
                    {(selectedDelivery.status === 'picked_up' || selectedDelivery.status === 'waiting') && (
                      <button
                        onClick={() => openActionModal('delivery_completed')}
                        className="bg-green-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" /> Complete
                      </button>
                    )}
                    {selectedDelivery.status !== 'waiting' && selectedDelivery.status === 'picked_up' && (
                      <button
                        onClick={() => openActionModal('waiting_start')}
                        className="bg-yellow-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                      >
                        <Clock className="w-5 h-5" /> Start Wait
                      </button>
                    )}
                    {selectedDelivery.status === 'waiting' && (
                      <button
                        onClick={() => openActionModal('waiting_end')}
                        className="bg-blue-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                      >
                        <Clock className="w-5 h-5" /> End Wait
                      </button>
                    )}
                    <button
                      onClick={() => openActionModal('issue')}
                      className="bg-red-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-5 h-5" /> Log Issue
                    </button>
                    <button
                      onClick={() => openActionModal('fuel_stop')}
                      className="bg-orange-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <Fuel className="w-5 h-5" /> Fuel Stop
                    </button>
                    <button
                      onClick={() => capturePhoto(selectedDelivery.id)}
                      className="bg-purple-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <Camera className="w-5 h-5" /> Take Photo
                    </button>
                    <button
                      onClick={() => setIsSignaturePad(true)}
                      className="bg-indigo-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <Edit className="w-5 h-5" /> Signature
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Distance Tracking */}
            <div className="bg-slate-800 rounded-xl p-4 border border-cyan-400/20">
              <h3 className="text-cyan-300 font-semibold mb-3">Distance Tracking</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Pickup KM</p>
                  <p className="text-white text-xl font-bold">{selectedDelivery.kmPickup || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Delivery KM</p>
                  <p className="text-white text-xl font-bold">{selectedDelivery.kmDelivery || '-'}</p>
                </div>
                {selectedDelivery.kmPickup && selectedDelivery.kmDelivery && (
                  <div className="col-span-2">
                    <p className="text-slate-400 text-sm">Total Distance</p>
                    <p className="text-cyan-400 text-2xl font-bold">
                      {(selectedDelivery.kmDelivery - selectedDelivery.kmPickup).toFixed(1)} km
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Photos */}
            {selectedDelivery.photos && selectedDelivery.photos.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-4 border border-cyan-400/20">
                <h3 className="text-cyan-300 font-semibold mb-3">Photos ({selectedDelivery.photos.length})</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDelivery.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo.data}
                      alt={`Proof ${idx + 1}`}
                      className="rounded-lg w-full h-32 object-cover border border-slate-600"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Signature */}
            {selectedDelivery.signature && (
              <div className="bg-slate-800 rounded-xl p-4 border border-cyan-400/20">
                <h3 className="text-cyan-300 font-semibold mb-3">Customer Signature</h3>
                <img
                  src={selectedDelivery.signature}
                  alt="Signature"
                  className="rounded-lg w-full border border-slate-600 bg-white"
                />
              </div>
            )}

            {/* Action Log */}
            <div className="bg-slate-800 rounded-xl p-4 border border-cyan-400/20">
              <h3 className="text-cyan-300 font-semibold mb-3">Action Log</h3>
              <div className="space-y-3">
                {selectedDelivery.actions.slice().reverse().map((action, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-700 last:border-0">
                    <div className="bg-cyan-500/20 p-2 rounded-lg">
                      <Clock className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold capitalize">{action.type.replace(/_/g, ' ')}</p>
                      {action.km && <p className="text-cyan-400 text-sm font-bold">📍 {action.km} km</p>}
                      {action.comments && <p className="text-slate-300 text-sm mt-1">{action.comments}</p>}
                      <p className="text-slate-500 text-xs mt-1">{new Date(action.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // List View
  return (
    <>
      <SEO
        title="Driver App - Delivery Logger | NightShift Logistics"
        description="NightShift driver app for real-time delivery tracking and logging. Manage your deliveries efficiently."
        keywords="delivery driver app Dubai, logistics tracking app, driver delivery app UAE"
        canonical="https://night-shiftlogistics.com/driver-app"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <div className="bg-slate-800 border-b border-cyan-400/30 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NightShift Driver</h1>
                <p className="text-cyan-300 text-sm">Delivery Logger</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-green-400" />
              ) : (
                <div className="flex items-center gap-2">
                  <WifiOff className="w-5 h-5 text-yellow-400" />
                  {pendingSync.length > 0 && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">{pendingSync.length}</span>
                  )}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="text-cyan-300"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-slate-800 rounded-xl p-4 border border-cyan-400/20 text-center">
              <p className="text-slate-400 text-xs mb-1">Active</p>
              <p className="text-white text-2xl font-bold">{deliveries.filter(d => d.status !== 'completed').length}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-green-400/20 text-center">
              <p className="text-slate-400 text-xs mb-1">Completed</p>
              <p className="text-green-400 text-2xl font-bold">{deliveries.filter(d => d.status === 'completed').length}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-blue-400/20 text-center">
              <p className="text-slate-400 text-xs mb-1">Total</p>
              <p className="text-blue-400 text-2xl font-bold">{deliveries.length}</p>
            </div>
          </div>

          {/* Delivery List */}
          <div className="space-y-3">
            {deliveries.length === 0 ? (
              <div className="bg-slate-800 rounded-xl p-8 text-center border border-cyan-400/20">
                <Truck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No deliveries yet</p>
                <p className="text-slate-500 text-sm">Create your first delivery to start logging</p>
              </div>
            ) : (
              deliveries.slice().reverse().map(delivery => (
                <div
                  key={delivery.id}
                  onClick={() => {
                    setSelectedDelivery(delivery);
                    setCurrentView('detail');
                  }}
                  className="bg-slate-800 rounded-xl p-4 border border-cyan-400/20 cursor-pointer hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">{delivery.id}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(delivery.status)}`}>
                      {getStatusText(delivery.status)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{new Date(delivery.createdAt).toLocaleString()}</span>
                    <span className="text-cyan-400">{delivery.actions.length} actions</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={createNewDelivery}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all z-20"
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>
    </>
  );
}
