import { apiRequest } from "./queryClient";

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

export async function downloadPDF(content: string): Promise<void> {
  try {
    const response = await apiRequest("POST", "/api/pdf", { content });
    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download PDF:', error);
    throw error;
  }
}

export async function emailContent(content: string, email: string, subject: string): Promise<void> {
  try {
    await apiRequest("POST", "/api/email", {
      content,
      email,
      subject,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
