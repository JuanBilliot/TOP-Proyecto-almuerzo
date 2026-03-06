// TEST DE CONEXIÓN GOOGLE DRIVE

// Tu enlace original
const originalUrl = "https://docs.google.com/document/d/1I0rImxiunxeQWVqs0ZTsx3fftwdt0rF9ZJnLPyN9rfE/edit?usp=sharing";

// Convertir a enlace de exportación
const exportUrl = "https://docs.google.com/document/d/1I0rImxiunxeQWVqs0ZTsx3fftwdt0rF9ZJnLPyN9rfE/export?format=txt";

console.log("🔍 Probando conexión con Google Drive...");
console.log("URL Original:", originalUrl);
console.log("URL Export:", exportUrl);

// Test con fetch
async function testDriveConnection() {
  try {
    console.log("📡 Intentando leer desde Drive...");
    
    // Método 1: Directo (puede fallar por CORS)
    const response1 = await fetch(exportUrl);
    console.log("Método 1 - Status:", response1.status);
    
    if (response1.ok) {
      const text = await response1.text();
      console.log("✅ Éxito directo! Primeros 100 chars:");
      console.log(text.substring(0, 100));
      return text;
    }
    
    // Método 2: Con proxy
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(exportUrl)}`;
    console.log("📡 Intentando con proxy:", proxyUrl);
    
    const response2 = await fetch(proxyUrl);
    console.log("Método 2 - Status:", response2.status);
    
    if (response2.ok) {
      const text = await response2.text();
      console.log("✅ Éxito con proxy! Primeros 100 chars:");
      console.log(text.substring(0, 100));
      return text;
    }
    
    console.log("❌ Ambos métodos fallaron");
    return null;
    
  } catch (error) {
    console.error("❌ Error en la conexión:", error);
    return null;
  }
}

// Para probar en la consola del navegador
// testDriveConnection();

export { testDriveConnection };
