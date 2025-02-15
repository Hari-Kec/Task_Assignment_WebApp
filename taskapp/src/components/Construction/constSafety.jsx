import React from 'react';
import { FaHardHat } from "react-icons/fa";
import { motion } from "framer-motion";

const safetyMeasures = [
  { title: "Fall Protection", description: "Use guardrails, safety nets, and personal fall arrest systems when working at heights." },
  { title: "Personal Protective Equipment (PPE)", description: "Ensure all workers wear appropriate PPE, including helmets, gloves, goggles, and steel-toed boots." },
  { title: "Site Safety Training", description: "Conduct regular safety training sessions for all workers to ensure awareness of safety protocols and procedures." },
  { title: "Hazard Communication", description: "Clearly label all hazardous materials and provide Safety Data Sheets (SDS) to workers." },
  { title: "Equipment Safety Inspections", description: "Perform regular inspections and maintenance on all equipment and machinery to ensure safe operation." },
  { title: "Scaffold Safety", description: "Follow proper scaffold erection and dismantling procedures and ensure scaffolds are stable and secure." },
  { title: "Electrical Safety", description: "Implement lockout/tagout (LOTO) procedures and ensure all electrical installations are compliant with safety standards." },
  { title: "Emergency Response Plans", description: "Develop and communicate clear emergency response plans for various scenarios, including fires, injuries, and severe weather." },
  { title: "Proper Lifting Techniques", description: "Train workers on safe lifting practices to prevent musculoskeletal injuries." },
  { title: "Trenching and Excavation Safety", description: "Follow safe practices for trenching and excavation, including sloping, shoring, and shielding." },
  { title: "Traffic Control", description: "Use signage, barriers, and flaggers to control vehicle and pedestrian traffic around construction sites." },
  { title: "First Aid and CPR Training", description: "Ensure that a sufficient number of workers are trained in first aid and CPR and that first aid kits are readily available." },
  { title: "Work Zone Safety", description: "Clearly delineate work zones and restrict unauthorized access to prevent accidents." },
  { title: "Heat Stress Prevention", description: "Implement measures to prevent heat stress, including hydration breaks and monitoring workers for signs of heat exhaustion." },
  { title: "Respiratory Protection", description: "Provide respiratory protection when working in environments with airborne contaminants and ensure proper fit testing." },
  { title: "Fire Safety Measures", description: "Maintain fire extinguishers on-site and conduct regular fire drills to ensure readiness." },
  { title: "Workplace Ergonomics", description: "Assess tasks for ergonomic risks and implement solutions to reduce strain on workers." },
  { title: "Chemical Safety", description: "Ensure proper storage, handling, and disposal of hazardous chemicals and provide spill kits for emergencies." },
  { title: "Daily Safety Briefings", description: "Conduct daily safety briefings to address potential hazards and review safety protocols." },
  { title: "Mental Health Support", description: "Provide resources for mental health support to address stress and anxiety related to construction work." }
];

const ConstSafety = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-500 to-orange-500 p-8">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg animate-pulse">
        Safety Measures for Construction Workers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {safetyMeasures.map((measure, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-2xl rounded-xl p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-yellow-500/50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="text-yellow-500 text-5xl mb-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaHardHat />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {measure.title}
            </h2>
            <p className="text-gray-600 text-center">
              {measure.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConstSafety;
