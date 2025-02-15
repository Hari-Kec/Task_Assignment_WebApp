import React from 'react';
import { FaUserMd } from "react-icons/fa";
import { motion } from "framer-motion";

const safetyMeasures = [
  { title: "Infection Control", description: "Adhere to proper hand hygiene protocols, use alcohol-based hand sanitizers, and wear gloves when required." },
  { title: "Personal Protective Equipment (PPE)", description: "Ensure the appropriate use of PPE, including masks, gloves, gowns, and face shields, based on the level of exposure to patients." },
  { title: "Sharps Safety", description: "Follow standard procedures for handling and disposing of needles, scalpels, and other sharp instruments to avoid needlestick injuries." },
  { title: "Biohazard Management", description: "Safely handle and dispose of medical waste, including blood, body fluids, and contaminated materials, in designated biohazard containers." },
  { title: "Safe Patient Handling", description: "Use proper lifting techniques or patient handling devices to prevent musculoskeletal injuries when moving or repositioning patients." },
  { title: "Medication Safety", description: "Double-check medication dosages, patient identity, and allergies before administering drugs to avoid medication errors." },
  { title: "Workplace Violence Prevention", description: "Implement strategies to prevent workplace violence, including de-escalation techniques and ensuring a secure environment." },
  { title: "Emergency Response", description: "Ensure healthcare workers are familiar with hospital emergency procedures for fire, natural disasters, and medical emergencies." },
  { title: "Respiratory Protection", description: "Use N95 respirators or equivalent when working with airborne infections like tuberculosis, COVID-19, or other respiratory diseases." },
  { title: "Chemical Safety", description: "Properly label and store hazardous chemicals, such as cleaning agents and disinfectants, and use them following safety guidelines." },
  { title: "Radiation Protection", description: "Ensure the use of lead aprons, shields, and other protective measures when working around radiation equipment like X-ray machines." },
  { title: "Mental Health Support", description: "Provide mental health resources, including counseling and stress management programs, to help healthcare workers cope with high-stress environments." },
  { title: "Bloodborne Pathogen Protection", description: "Follow universal precautions to minimize exposure to bloodborne pathogens, including proper handling of contaminated instruments." },
  { title: "Fatigue Management", description: "Implement shift work policies and adequate break times to reduce healthcare worker fatigue, which can lead to errors and accidents." },
  { title: "Fire Safety", description: "Maintain awareness of hospital fire safety protocols, including evacuation plans and the use of fire extinguishers." },
  { title: "Slip, Trip, and Fall Prevention", description: "Keep walkways clear of obstacles, ensure proper footwear, and promptly clean up any spills to avoid accidents." },
  { title: "Safe Use of Medical Equipment", description: "Receive proper training on the use of medical devices and equipment to ensure safe and effective operation." },
  { title: "Heat Stress Prevention", description: "Ensure hydration and take regular breaks when working in high-temperature environments, such as during the use of protective suits in isolation wards." },
  { title: "Workplace Ergonomics", description: "Maintain proper posture and use ergonomic workstations to minimize strain during administrative tasks." },
  { title: "Daily Safety Briefings", description: "Conduct daily briefings to review safety protocols, discuss potential hazards, and ensure workers are updated on the latest health and safety guidelines." }
];

const HealthSafety = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-8">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg animate-pulse">
        Safety Measures for Healthcare Workers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {safetyMeasures.map((measure, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-2xl rounded-xl p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-blue-500/50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="text-blue-500 text-5xl mb-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaUserMd />
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

export default HealthSafety;
