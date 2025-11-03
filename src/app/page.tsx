

import { DocumentList } from "@/components/documents/DocumentList";
import InputCard from "@/components/inputs/InputCard";
import BlueParticlesBackground from "@/components/particlesbg";

export default function HomePage() {
    
  return (
    <div className="min-h-screen  p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
    AI Document Analysis Platform
      </h1>
<BlueParticlesBackground />
      {/* Input Card */}
      <InputCard

      />

      {/* Documents List */}
      <DocumentList
      
   
      />
    </div>
  );
}
