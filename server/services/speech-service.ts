import { Readable } from 'stream';

interface SpeechToTextResult {
  text: string;
  confidence?: number;
}

// AssemblyAI implementation
export async function transcribeWithAssemblyAI(audioBuffer: Buffer): Promise<SpeechToTextResult> {
  if (!process.env.ASSEMBLYAI_API_KEY) {
    throw new Error("ASSEMBLYAI_API_KEY not configured");
  }

  try {
    // Upload audio file
    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        'authorization': process.env.ASSEMBLYAI_API_KEY,
        'content-type': 'application/octet-stream'
      },
      body: audioBuffer
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    const uploadData = await uploadResponse.json();
    const audioUrl = uploadData.upload_url;

    // Request transcription
    const transcriptionResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'authorization': process.env.ASSEMBLYAI_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        audio_url: audioUrl,
        language_detection: true,
        punctuate: true,
        format_text: true
      })
    });

    if (!transcriptionResponse.ok) {
      throw new Error(`Transcription request failed: ${transcriptionResponse.statusText}`);
    }

    const transcriptionData = await transcriptionResponse.json();
    const transcriptionId = transcriptionData.id;

    // Poll for completion
    let result = await pollTranscriptionStatus(transcriptionId);
    
    return {
      text: result.text || '',
      confidence: result.confidence
    };
  } catch (error) {
    console.error('AssemblyAI transcription error:', error);
    throw new Error(`Speech transcription failed: ${error.message}`);
  }
}

async function pollTranscriptionStatus(transcriptionId: string): Promise<any> {
  const maxAttempts = 60; // 5 minutes max
  let attempts = 0;

  while (attempts < maxAttempts) {
    const response = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptionId}`, {
      headers: {
        'authorization': process.env.ASSEMBLYAI_API_KEY!
      }
    });

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.status === 'completed') {
      return result;
    } else if (result.status === 'error') {
      throw new Error(`Transcription failed: ${result.error}`);
    }

    // Wait 5 seconds before next attempt
    await new Promise(resolve => setTimeout(resolve, 5000));
    attempts++;
  }

  throw new Error('Transcription timeout');
}

// Gladia implementation as fallback
export async function transcribeWithGladia(audioBuffer: Buffer): Promise<SpeechToTextResult> {
  if (!process.env.GLADIA_API_KEY) {
    throw new Error("GLADIA_API_KEY not configured");
  }

  try {
    const formData = new FormData();
    const audioBlob = new Blob([audioBuffer], { type: 'audio/webm' });
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('toggle_diarization', 'false');
    formData.append('language_behaviour', 'automatic single language');

    const response = await fetch('https://api.gladia.io/audio/text/audio-transcription/', {
      method: 'POST',
      headers: {
        'X-Gladia-Key': process.env.GLADIA_API_KEY
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Gladia API error: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      text: result.prediction || '',
      confidence: result.confidence
    };
  } catch (error) {
    console.error('Gladia transcription error:', error);
    throw new Error(`Speech transcription failed: ${error.message}`);
  }
}

// Main transcription function with fallback
export async function transcribeAudio(audioBuffer: Buffer): Promise<SpeechToTextResult> {
  try {
    // Try AssemblyAI first
    return await transcribeWithAssemblyAI(audioBuffer);
  } catch (error) {
    console.log('AssemblyAI failed, trying Gladia fallback:', error.message);
    
    try {
      // Fall back to Gladia
      return await transcribeWithGladia(audioBuffer);
    } catch (gladiaError) {
      console.error('Both speech services failed:', gladiaError.message);
      throw new Error('Speech recognition unavailable');
    }
  }
}

// Azure Text-to-Speech Implementation
export async function synthesizeSpeechWithAzure(text: string, voice: string = "en-US-JennyNeural"): Promise<Buffer> {
  if (!process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_ENDPOINT) {
    throw new Error("Azure Speech credentials not configured");
  }

  try {
    const endpoint = process.env.AZURE_SPEECH_ENDPOINT.replace('/tts/cognitiveservices/v1', '');
    const url = `${endpoint}/tts/cognitiveservices/v1`;
    
    const ssml = `
      <speak version="1.0" xml:lang="en-US">
        <voice name="${voice}">
          <prosody rate="0.9" pitch="medium">
            ${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </prosody>
        </voice>
      </speak>
    `;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        'User-Agent': 'YourAppName'
      },
      body: ssml
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Azure TTS error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());
    return audioBuffer;
  } catch (error) {
    console.error('Azure TTS error:', error);
    throw new Error(`Text-to-speech synthesis failed: ${error.message}`);
  }
}