// ===================================================================
// PROCEDURAL CYBERPUNK AUDIO ENGINE (WEB AUDIO API)
// ===================================================================

class CyberAudio {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.step = 0;
    this.nextNoteTime = 0.0;
    
    // Tempo and sequence settings
    this.tempo = 118; // EDM/Cyberpunk tempo
    this.lookahead = 25.0; // ms
    this.scheduleAheadTime = 0.1; // seconds
    this.timerID = null;

    // Sequence patterns (16 steps)
    this.seqKick  = [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0];
    this.seqSnare = [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0];
    this.seqHat   = [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1];
    
    // Driving synthwave bassline (E minor)
    // Notes: E1, G1, A1, B1, D2, E2
    const E1 = 41.20, G1 = 48.99, A1 = 55.00, B1 = 61.74, D2 = 73.42, E2 = 82.41;
    this.seqBass = [
      E1, E1, E1, E1, 
      E2, E1, E1, E1, 
      G1, G1, B1, B1, 
      A1, A1, D2, D2
    ];
  }

  // Must be called as a result of a user gesture (e.g., button click)
  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.4; // Initial volume
    this.masterGain.connect(this.ctx.destination);
  }

  start() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    this.scheduler();
  }

  stop() {
    this.isPlaying = false;
    clearTimeout(this.timerID);
  }

  toggleMute() {
    if (!this.masterGain) return false;
    const current = this.masterGain.gain.value;
    this.masterGain.gain.setValueAtTime(current > 0 ? 0 : 0.4, this.ctx.currentTime);
    return this.masterGain.gain.value === 0;
  }

  setVolume(val) {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  nextNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += 0.25 * secondsPerBeat; // 16th notes
    this.step = (this.step + 1) % 16;
  }

  scheduleNote(stepNumber, time) {
    // 1. KICK DRUM
    if (this.seqKick[stepNumber]) {
      this.playKick(time);
    }

    // 2. SNARE
    if (this.seqSnare[stepNumber]) {
      this.playSnare(time);
    }

    // 3. HI-HAT
    if (this.seqHat[stepNumber]) {
      // Accent on the off-beat
      const vol = (stepNumber % 4 === 2) ? 0.3 : 0.08;
      this.playHiHat(time, vol);
    }

    // 4. BASSLINE
    const bassNote = this.seqBass[stepNumber];
    if (bassNote) {
      // Add some rhythmic variation: skip a few notes randomly or based on step
      if (stepNumber !== 14) { 
        this.playBass(time, bassNote);
      }
    }
  }

  scheduler() {
    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.step, this.nextNoteTime);
      this.nextNote();
    }
    this.timerID = setTimeout(() => this.scheduler(), this.lookahead);
  }

  // ===================================
  // SYNTHESIZERS
  // ===================================

  playKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    
    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
    
    osc.start(time);
    osc.stop(time + 0.5);
  }

  playSnare(time) {
    // Noise buffer for snare crack
    const bufferSize = this.ctx.sampleRate * 0.2; // 200ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    
    const gain = this.ctx.createGain();
    
    noise.connect(noiseFilter);
    noiseFilter.connect(gain);
    gain.connect(this.masterGain);
    
    // Snare envelope
    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    
    // Add a tonal component (body)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    osc.frequency.setValueAtTime(250, time);
    oscGain.gain.setValueAtTime(0.5, time);
    oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    
    osc.start(time);
    osc.stop(time + 0.2);
    noise.start(time);
  }

  playHiHat(time, vol) {
    const bufferSize = this.ctx.sampleRate * 0.05; // 50ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 10000;
    
    const gain = this.ctx.createGain();
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
    
    noise.start(time);
  }

  playBass(time, freq) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    
    // Sawtooth for aggressive synthwave tone
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    
    // Lowpass filter envelope for "pluck" sound
    filter.type = 'lowpass';
    filter.Q.value = 4; // Resonance
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(100, time + 0.2);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    // Volume envelope
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.setTargetAtTime(0, time + 0.05, 0.1);
    
    osc.start(time);
    osc.stop(time + 0.3);
  }

  playClick() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    // High pitched blip that drops quickly
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);

    gain.gain.setValueAtTime(0.3, t); // lower volume for clicks
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(t);
    osc.stop(t + 0.1);
  }

  playError() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(80, t + 0.2); // pitch bend down

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  playSuccess() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    // Play a quick arpeggio (C5 -> E5 -> G5)
    const playNote = (freq, delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.4, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, t + delay + 0.2);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(t + delay);
      osc.stop(t + delay + 0.3);
    };

    playNote(523.25, 0);      // C5
    playNote(659.25, 0.08);   // E5
    playNote(783.99, 0.16);   // G5
  }
}

// Export a singleton instance
export const audioSystem = new CyberAudio();
