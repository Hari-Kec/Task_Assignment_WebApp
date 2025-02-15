import React from 'react';
import { FaFireExtinguisher } from "react-icons/fa";
import { motion } from "framer-motion";

const safetyMeasures = [
  { title: "Personal Protective Equipment (PPE)", description: "Always wear the complete PPE, including fire-resistant clothing, helmets, gloves, boots, and face shields, to protect from heat and debris." },
  { title: "Respiratory Protection", description: "Use Self-Contained Breathing Apparatus (SCBA) in environments with smoke, toxic fumes, or low oxygen levels." },
  { title: "Heat Stress Prevention", description: "Take regular breaks during prolonged firefighting to cool down and hydrate to avoid heat exhaustion or heat stroke." },
  { title: "Emergency Evacuation Procedures", description: "Be well-versed in evacuation plans and escape routes during fire rescue missions to ensure the safety of yourself and others." },
  { title: "Communication Protocols", description: "Maintain clear and constant communication with the team through radios or other communication devices during operations." },
  { title: "Fireground Safety", description: "Be aware of surroundings and potential hazards like collapsing structures, electrical wires, or hazardous materials while at the scene." },
  { title: "Safe Handling of Hoses and Ladders", description: "Ensure proper grip and stability when handling heavy hoses and extending ladders to prevent injuries or accidents." },
  { title: "Equipment Maintenance", description: "Perform regular inspections and maintenance on firefighting equipment, including SCBA, hoses, pumps, and tools, to ensure they are in working order." },
  { title: "Training and Drills", description: "Participate in regular fire drills and training exercises to stay prepared for different fire scenarios and emergency rescue operations." },
  { title: "Vehicle Safety", description: "Drive fire trucks and emergency vehicles with caution, following all traffic laws, especially when responding to calls." },
  { title: "Hazardous Materials (HAZMAT) Awareness", description: "Be trained in handling hazardous materials and know the correct procedures for dealing with chemical, biological, or radiological hazards." },
  { title: "Fire Behavior Understanding", description: "Understand fire behavior, including flashover and backdraft risks, to anticipate and react appropriately in dangerous situations." },
  { title: "Buddy System", description: "Always work with a partner or team when entering burning structures to ensure mutual safety and quick assistance in case of emergencies." },
  { title: "First Aid and CPR", description: "Be trained in first aid and CPR to provide immediate medical assistance to victims or injured colleagues at the scene." },
  { title: "Decontamination", description: "Follow proper decontamination procedures after exposure to hazardous substances or fire residues to prevent secondary contamination or health issues." },
  { title: "Mental Health Support", description: "Seek psychological support or counseling services to manage stress, trauma, or mental health issues resulting from firefighting experiences." },
  { title: "Hydration and Nutrition", description: "Maintain good hydration and nutrition during and after firefighting operations to stay physically fit and alert." },
  { title: "Risk Assessment", description: "Conduct thorough risk assessments before entering dangerous environments to evaluate structural integrity, fire spread, and rescue feasibility." },
  { title: "Post-Incident Reviews", description: "Participate in post-incident debriefs to review the firefighting operation, identify successes, and address any safety concerns for future improvement." },
  { title: "Incident Command System (ICS) Compliance", description: "Follow the Incident Command System's chain of command and guidelines during large-scale emergencies to ensure coordinated and efficient operations." }
];

const FireSafety = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-orange-500 p-8">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg">🔥 Safety Measures for Fire Service Workers 🔥</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {safetyMeasures.map((measure, index) => (
          <motion.div 
            key={index} 
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center transition-transform transform hover:scale-110 hover:shadow-2xl border-4 border-red-400"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FaFireExtinguisher className="text-red-600 text-5xl animate-pulse mb-3" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">{measure.title}</h2>
            <p className="text-gray-600 text-center leading-relaxed">{measure.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FireSafety;